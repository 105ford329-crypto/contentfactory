const fs = require('fs');
const path = require('path');

// Mapping placeholders to real credential IDs
const CREDENTIAL_MAP = {
  // Placeholders → Real IDs
  'SCRAPERCREATORS_CREDENTIALS_ID': 'fZGnjUIKCVNKz54C', // From audit
  'GOOGLE_SHEETS_CREDENTIALS_ID': 'VYgLH1nyxvDHNqbF', // Already exists
  'GOOGLE_DOCS_CREDENTIALS_ID': 'GOOGLE_DOCS_CREDENTIALS_ID', // Need to create
  'OPENAI_CREDENTIALS_ID': 'BPj3GH3bI2f4q6aI', // Already exists
  'TELEGRAM_CREDENTIALS_ID': 'RpN2LGvNZWwqquLw', // Already exists
  'ANTHROPIC_CREDENTIALS_ID': 'ANTHROPIC_CREDENTIALS_ID', // Need to create
  'HEYGEN_CREDENTIALS_ID': 'HEYGEN_CREDENTIALS_ID', // Need to create
  'IDEOGRAM_CREDENTIALS_ID': 'rrCVfNeSKnGe0r0G', // Already exists
  'THREADS_CREDENTIALS_ID': 'THREADS_CREDENTIALS_ID', // Need to create
  'PINTEREST_CREDENTIALS_ID': 'PINTEREST_CREDENTIALS_ID', // Need to create
  'SUPABASE_CREDENTIALS_ID': 'XavzftuBevmNShcu', // Already exists
  'POSTGRES_CREDENTIALS_ID': '9cRi0vqQ4mtxZPs2' // Already exists
};

// Main workflows IDs from the original task
const MAIN_WORKFLOWS = [
  'PzmlZvfI8xZrF8YC', // AI Orchestrator
  'fqUk7t9De8NXzQqf', // TikTok Parser
  'BtVjR7i5Gd2cQE2d', // Instagram Parser
  'HuSjIsQg1xIpaseF', // Video Montage
  'aklB2WYNAnmhfT43', // YouTube Parser
  'aeK9XrhduilWSoLX', // YouTube Deep Analysis
  'zQJzBmZeVWXEpTxT', // Pinterest Parser
  'LTuU9VdigtS5HtlY', // Carousel Generator
  'Bz3vDVtLy0QTzZac', // Threads Publisher
  'X8RJV2g5WI8go1B4', // Pinterest Publisher
  'mEle1z7D67DSCVTG', // Cost Tracker
  'yYraQp7kL4Wja1mo', // Performance Analytics
  'zIezwsaOknD9yJq8', // Vector DB & Learning
  'CgQnHIkKYfsNicA4'  // YouTube Competitor Analysis
];

const workflowsDir = 'd:/AI n8n/Готовые сценарии/Content factory';

console.log('=== Scanning all main workflows for credentials ===\n');

let report = {
  scanned: 0,
  updated: 0,
  credentials_found: {},
  placeholders_found: [],
  missing_credentials: []
};

MAIN_WORKFLOWS.forEach(workflowId => {
  const filePath = path.join(workflowsDir, `workflow_${workflowId}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: workflow_${workflowId}.json`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const workflow = JSON.parse(content);

    console.log(`\n📄 ${workflow.name || 'Unnamed'} (${workflowId})`);
    report.scanned++;

    let hasChanges = false;
    let workflowPlaceholders = [];

    if (workflow.nodes) {
      workflow.nodes.forEach(node => {
        if (node.credentials) {
          Object.entries(node.credentials).forEach(([credType, credData]) => {
            const credId = credData.id;
            const credName = credData.name;

            // Check if it's a placeholder
            if (credId.includes('_CREDENTIALS_ID')) {
              console.log(`   🔴 Placeholder found in node "${node.name}"`);
              console.log(`      Type: ${credType}`);
              console.log(`      Current ID: ${credId}`);

              workflowPlaceholders.push({
                node: node.name,
                type: credType,
                placeholder: credId,
                name: credName
              });

              // Check if we have a replacement
              if (CREDENTIAL_MAP[credId] && CREDENTIAL_MAP[credId] !== credId) {
                const newId = CREDENTIAL_MAP[credId];
                console.log(`      ✅ Replacing with: ${newId}`);
                node.credentials[credType].id = newId;
                hasChanges = true;
                report.updated++;
              } else {
                console.log(`      ⚠️  No replacement available - needs manual creation`);
                if (!report.missing_credentials.includes(credId)) {
                  report.missing_credentials.push(credId);
                }
              }
            } else {
              // Real credential ID
              if (!report.credentials_found[credId]) {
                report.credentials_found[credId] = {
                  id: credId,
                  name: credName,
                  type: credType,
                  workflows: []
                };
              }
              if (!report.credentials_found[credId].workflows.includes(workflow.name)) {
                report.credentials_found[credId].workflows.push(workflow.name);
              }
            }
          });
        }
      });
    }

    if (workflowPlaceholders.length > 0) {
      report.placeholders_found.push({
        workflow: workflow.name,
        workflowId: workflowId,
        placeholders: workflowPlaceholders
      });
    }

    // Save updated workflow if changes were made
    if (hasChanges) {
      const outputPath = path.join(workflowsDir, `workflow_${workflowId}_FIXED.json`);
      fs.writeFileSync(outputPath, JSON.stringify(workflow, null, 2));
      console.log(`   💾 Saved updated version to: workflow_${workflowId}_FIXED.json`);
    } else if (workflowPlaceholders.length === 0) {
      console.log(`   ✅ No placeholders found - all credentials OK`);
    }

  } catch (e) {
    console.error(`   ❌ Error processing workflow: ${e.message}`);
  }
});

console.log('\n\n=== FINAL REPORT ===\n');
console.log(`Workflows scanned: ${report.scanned}`);
console.log(`Credentials updated: ${report.updated}`);
console.log(`\nReal credentials found: ${Object.keys(report.credentials_found).length}`);

Object.values(report.credentials_found).forEach(cred => {
  console.log(`\n  ${cred.name} (${cred.id})`);
  console.log(`    Type: ${cred.type}`);
  console.log(`    Used in: ${cred.workflows.join(', ')}`);
});

console.log(`\n\n⚠️  Missing credentials (need to create manually):`);
report.missing_credentials.forEach(cred => {
  console.log(`  - ${cred}`);
});

console.log(`\n\n📋 Workflows with placeholders: ${report.placeholders_found.length}`);
report.placeholders_found.forEach(item => {
  console.log(`\n  ${item.workflow} (${item.workflowId})`);
  item.placeholders.forEach(p => {
    console.log(`    - ${p.node}: ${p.placeholder} → ${CREDENTIAL_MAP[p.placeholder] || 'NEED TO CREATE'}`);
  });
});

// Save full report
fs.writeFileSync(
  path.join(workflowsDir, 'CREDENTIALS_FULL_REPORT.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n\n✅ Full report saved to CREDENTIALS_FULL_REPORT.json');
