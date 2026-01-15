const fs = require('fs');
const path = require('path');

console.log('=== Организация файлов ===\n');

// Main workflow IDs
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
  'CgQnHIkKYfsNicA4', // YouTube Competitor Analysis
  'UXpFLGUwd9MVn1AZ'  // Video creator AI agent
];

const files = fs.readdirSync('.').filter(f => f.startsWith('workflow_') && f.endsWith('.json'));

console.log('Найдено файлов:', files.length);
console.log('');

// Create folders if not exist
['backup', 'archive', 'fixed_workflows'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`📁 Создана папка: ${dir}`);
  }
});

console.log('');

let moved = {
  main: [],
  backup: [],
  fixed: [],
  archive: []
};

files.forEach(file => {
  // Extract workflow ID from filename
  const match = file.match(/workflow_([A-Za-z0-9]+)/);
  const workflowId = match ? match[1] : null;

  if (file.includes('_FIXED')) {
    // Fixed workflows
    const dest = path.join('fixed_workflows', file);
    if (!fs.existsSync(dest)) {
      fs.renameSync(file, dest);
      moved.fixed.push(file);
      console.log('📁 → fixed_workflows:', file);
    }
  } else if (file.includes('BACKUP')) {
    // Backup files
    const dest = path.join('backup', file);
    if (!fs.existsSync(dest)) {
      fs.renameSync(file, dest);
      moved.backup.push(file);
      console.log('💾 → backup:', file);
    }
  } else if (file.includes('analysis') || file.includes('diagnostic') || file.includes('info') ||
             file.includes('current') || file.includes('restored') || file.includes('verified') ||
             file.includes('audit') || file.includes('fixed_') || file.includes('reply_markup') ||
             file.includes('callbacks') || file.includes('router') || file.includes('error_handling') ||
             file.includes('full_audit')) {
    // Archive utility files
    const dest = path.join('archive', file);
    if (!fs.existsSync(dest)) {
      fs.renameSync(file, dest);
      moved.archive.push(file);
      console.log('🗄️  → archive:', file);
    }
  } else if (workflowId && MAIN_WORKFLOWS.includes(workflowId)) {
    // Main workflows stay in root
    moved.main.push(file);
    console.log('✅ Main workflow:', file);
  } else {
    // Unknown - move to archive
    const dest = path.join('archive', file);
    if (!fs.existsSync(dest)) {
      fs.renameSync(file, dest);
      moved.archive.push(file);
      console.log('🗄️  → archive (unknown):', file);
    }
  }
});

console.log('\n=== Итого ===');
console.log('✅ Основных workflows в корне:', moved.main.length);
console.log('💾 Перемещено в backup:', moved.backup.length);
console.log('📁 Перемещено в fixed_workflows:', moved.fixed.length);
console.log('🗄️  Перемещено в archive:', moved.archive.length);

console.log('\n=== Основные workflows ===');
moved.main.forEach(f => console.log(' ', f));
