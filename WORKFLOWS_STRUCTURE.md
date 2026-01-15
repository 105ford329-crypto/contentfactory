# 📁 Структура Workflows

**Дата организации:** 2026-01-15

---

## 🎯 Основные Workflows (14 шт.)

Все основные workflows находятся в корне папки:

| ID | Файл | Название | Статус |
|----|------|----------|--------|
| `PzmlZvfI8xZrF8YC` | [workflow_PzmlZvfI8xZrF8YC.json](./workflow_PzmlZvfI8xZrF8YC.json) | AI Orchestrator | ✅ OK |
| `fqUk7t9De8NXzQqf` | [workflow_fqUk7t9De8NXzQqf.json](./workflow_fqUk7t9De8NXzQqf.json) | TikTok Parser | ✅ OK |
| `BtVjR7i5Gd2cQE2d` | [workflow_BtVjR7i5Gd2cQE2d.json](./workflow_BtVjR7i5Gd2cQE2d.json) | Instagram Parser | ✅ OK |
| `HuSjIsQg1xIpaseF` | [workflow_HuSjIsQg1xIpaseF.json](./workflow_HuSjIsQg1xIpaseF.json) | AI Video Montage | ✅ OK |
| `aklB2WYNAnmhfT43` | [workflow_aklB2WYNAnmhfT43.json](./workflow_aklB2WYNAnmhfT43.json) | YouTube Parser | ✅ OK |
| `aeK9XrhduilWSoLX` | [workflow_aeK9XrhduilWSoLX.json](./workflow_aeK9XrhduilWSoLX.json) | YouTube Deep Analysis | ⚠️ Имеет исправленную версию |
| `zQJzBmZeVWXEpTxT` | [workflow_zQJzBmZeVWXEpTxT.json](./workflow_zQJzBmZeVWXEpTxT.json) | Pinterest Parser | ✅ OK |
| `LTuU9VdigtS5HtlY` | [workflow_LTuU9VdigtS5HtlY.json](./workflow_LTuU9VdigtS5HtlY.json) | Carousel Generator | ✅ OK |
| `Bz3vDVtLy0QTzZac` | [workflow_Bz3vDVtLy0QTzZac.json](./workflow_Bz3vDVtLy0QTzZac.json) | Threads Publisher | ✅ OK |
| `X8RJV2g5WI8go1B4` | [workflow_X8RJV2g5WI8go1B4.json](./workflow_X8RJV2g5WI8go1B4.json) | Pinterest Publisher | ✅ OK |
| `mEle1z7D67DSCVTG` | [workflow_mEle1z7D67DSCVTG.json](./workflow_mEle1z7D67DSCVTG.json) | Cost Tracker | ✅ OK |
| `yYraQp7kL4Wja1mo` | [workflow_yYraQp7kL4Wja1mo.json](./workflow_yYraQp7kL4Wja1mo.json) | Performance Analytics | ✅ OK |
| `zIezwsaOknD9yJq8` | [workflow_zIezwsaOknD9yJq8.json](./workflow_zIezwsaOknD9yJq8.json) | Vector DB & Learning | ✅ OK |
| `CgQnHIkKYfsNicA4` | [workflow_CgQnHIkKYfsNicA4.json](./workflow_CgQnHIkKYfsNicA4.json) | YouTube Competitor Analysis | ✅ OK |

---

## 📂 Структура папок

```
Content factory/
├── workflow_*.json (14 основных файлов)
├── fixed_workflows/
│   └── workflow_aeK9XrhduilWSoLX_FIXED.json (исправленные credentials)
├── backup/
│   └── workflow_BACKUP_20260112_122451.json
├── archive/
│   ├── workflow_analysis.json
│   ├── workflow_current.json
│   ├── workflow_diagnostic.json
│   ├── workflow_fixed_callbacks.json
│   ├── workflow_fixed_router.json
│   ├── workflow_full_audit.json
│   ├── workflow_info.json
│   ├── workflow_reply_markup_fixed.json
│   ├── workflow_restored.json
│   ├── workflow_verified.json
│   └── workflow_with_error_handling.json
├── CONTENT_FACTORY_FULL_ANALYSIS.md
├── CONTENT_FACTORY_FULL_ANALYSIS.pdf
├── CREDENTIALS_MAP.md
├── CREDENTIALS_FULL_REPORT.json
├── SETUP_AUDIT_AND_PLAN.md
├── WORKFLOWS_STRUCTURE.md (этот файл)
├── README_CONTENT_FACTORY.md
├── fix_credentials.js
└── organize_files.js
```

---

## 🔧 Исправленные Workflows

### [fixed_workflows/workflow_aeK9XrhduilWSoLX_FIXED.json](./fixed_workflows/workflow_aeK9XrhduilWSoLX_FIXED.json)

**Workflow 7 - YouTube Deep Analysis**

**Изменения:**
- ✅ Заменено 21 placeholder credential ID на реальные
- ✅ `SCRAPERCREATORS_CREDENTIALS_ID` → `fZGnjUIKCVNKz54C`
- ✅ `GOOGLE_SHEETS_CREDENTIALS_ID` → `VYgLH1nyxvDHNqbF`
- ✅ `OPENAI_CREDENTIALS_ID` → `BPj3GH3bI2f4q6aI`
- ✅ `TELEGRAM_CREDENTIALS_ID` → `RpN2LGvNZWwqquLw`
- ✅ `GOOGLE_DOCS_CREDENTIALS_ID` → `VYgLH1nyxvDHNqbF` (использует Google Sheets credential)

**Статус:** Готов к загрузке в n8n

---

## 📊 Статистика Credentials

### Реальные credentials, найденные в workflows:

1. **VYgLH1nyxvDHNqbF** - Google Sheets Main link
   - Используется в: Workflow 3, Workflow 7

2. **rrCVfNeSKnGe0r0G** - Ideogram API
   - Используется в: Workflow 3

3. **QqD41oqOROB6DxXr** - Creatomate API
   - Используется в: Workflow 3

4. **fZGnjUIKCVNKz54C** - ScraperCreators API
   - Используется в: Workflow 7 (после исправления)

5. **BPj3GH3bI2f4q6aI** - OpenAI account 4
   - Используется в: Workflow 7 (после исправления)

6. **RpN2LGvNZWwqquLw** - Telegram VideoMaker
   - Используется в: Workflow 7 (после исправления)

7. **XavzftuBevmNShcu** - Supabase video_maker

8. **9cRi0vqQ4mtxZPs2** - Postgres Video_maker

### Placeholders (исправлены):
- ❌ SCRAPERCREATORS_CREDENTIALS_ID
- ❌ GOOGLE_SHEETS_CREDENTIALS_ID
- ❌ GOOGLE_DOCS_CREDENTIALS_ID
- ❌ OPENAI_CREDENTIALS_ID
- ❌ TELEGRAM_CREDENTIALS_ID

---

## 🚀 Следующие шаги

1. ✅ Организация файлов выполнена
2. ✅ Credentials исправлены
3. ⏳ Загрузить исправленный workflow в n8n
4. ⏳ Протестировать workflow
5. ⏳ Закоммитить изменения в GitHub

---

## 📝 Примечания

- Все основные workflows остаются в корне для удобного доступа
- Исправленные версии в `fixed_workflows/` для сравнения
- Старые/служебные файлы в `archive/` для истории
- Backup в `backup/` для восстановления если потребуется

**Дата последнего обновления:** 2026-01-15
