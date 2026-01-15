# 🔑 Карта Credentials для Content Factory

**Дата анализа:** 2026-01-15
**Workflows проанализировано:** 14

---

## 📊 Сводка по Credentials

Обнаружено **9 уникальных credential ID**, используемых в workflows:

### 1. **SCRAPERCREATORS_CREDENTIALS_ID**
- **Тип:** `httpHeaderAuth`
- **Название:** ScraperCreators API
- **Статус:** ⚠️ PLACEHOLDER (не настроен)
- **Используется в:**
  - Workflow 7 - YouTube Deep Analysis (9 нод)

### 2. **GOOGLE_SHEETS_CREDENTIALS_ID**
- **Тип:** `googleSheetsOAuth2Api`
- **Название:** Google Sheets account
- **Статус:** ⚠️ PLACEHOLDER (не настроен)
- **Используется в:**
  - Workflow 7 - YouTube Deep Analysis (6 нод)

### 3. **GOOGLE_DOCS_CREDENTIALS_ID**
- **Тип:** `googleDocsOAuth2Api`
- **Название:** Google Docs account
- **Статус:** ⚠️ PLACEHOLDER (не настроен)
- **Используется в:**
  - Workflow 7 - YouTube Deep Analysis (1 нода)

### 4. **OPENAI_CREDENTIALS_ID**
- **Тип:** `openAiApi`
- **Название:** OpenAI account
- **Статус:** ⚠️ PLACEHOLDER (не настроен)
- **Используется в:**
  - Workflow 7 - YouTube Deep Analysis (2 ноды)

### 5. **TELEGRAM_CREDENTIALS_ID**
- **Тип:** `telegramApi`
- **Название:** Telegram Bot
- **Статус:** ⚠️ PLACEHOLDER (не настроен)
- **Используется в:**
  - Workflow 7 - YouTube Deep Analysis (1 нода)

### 6. **VYgLH1nyxvDHNqbF** (Real credential ID)
- **Тип:** `googleSheetsOAuth2Api`
- **Название:** Google Sheets Main link
- **Статус:** ✅ НАСТРОЕН (реальный ID)
- **Используется в:**
  - Workflow 7 - YouTube Deep Analysis (1 нода)
  - Workflow 3 - AI Video Montage (5 нод)

### 7. **RpN2LGvNZWwqquLw** (Real credential ID)
- **Тип:** `telegramApi`
- **Название:** VideoMaker
- **Статус:** ✅ НАСТРОЕН (реальный ID)
- **Используется в:**
  - Video_creator_AI_agent_FIXED1 (много нод)

### 8. **BPj3GH3bI2f4q6aI** (Real credential ID)
- **Тип:** `openAiApi`
- **Название:** OpenAi account 4
- **Статус:** ✅ НАСТРОЕН (реальный ID)
- **Используется в:**
  - Video_creator_AI_agent_FIXED1 (2 ноды)

### 9. **XavzftuBevmNShcu** (Real credential ID)
- **Тип:** `supabaseApi`
- **Название:** Supabase video_maker
- **Статус:** ✅ НАСТРОЕН (реальный ID)
- **Используется в:**
  - Video_creator_AI_agent_FIXED1 (множество нод)

### 10. **9cRi0vqQ4mtxZPs2** (Real credential ID)
- **Тип:** `postgres`
- **Название:** Postgres Video_maker
- **Статус:** ✅ НАСТРОЕН (реальный ID)
- **Используется в:**
  - Video_creator_AI_agent_FIXED1 (1 нода)

### 11. **rrCVfNeSKnGe0r0G** (Real credential ID)
- **Тип:** `httpHeaderAuth`
- **Название:** Ideogram API
- **Статус:** ✅ НАСТРОЕН (реальный ID)
- **Используется в:**
  - Workflow 3 - AI Video Montage (2 ноды)

### 12. **QqD41oqOROB6DxXr** (Real credential ID)
- **Тип:** `httpHeaderAuth`
- **Название:** Creatomate API
- **Статус:** ✅ НАСТРОЕН (реальный ID)
- **Используется в:**
  - Workflow 3 - AI Video Montage (1 нода)

---

## ⚠️ КРИТИЧЕСКИЕ ПРОБЛЕМЫ

### Placeholders вместо реальных credentials

Следующие workflows используют **placeholder ID** вместо реальных credentials:

#### Workflow 7 - YouTube Deep Analysis
- `SCRAPERCREATORS_CREDENTIALS_ID` → нужен реальный ID для ScraperCreators API
- `GOOGLE_SHEETS_CREDENTIALS_ID` → нужен реальный ID (возможно использовать `VYgLH1nyxvDHNqbF`)
- `GOOGLE_DOCS_CREDENTIALS_ID` → нужен реальный ID для Google Docs
- `OPENAI_CREDENTIALS_ID` → нужен реальный ID (возможно использовать `BPj3GH3bI2f4q6aI`)
- `TELEGRAM_CREDENTIALS_ID` → нужен реальный ID (возможно использовать `RpN2LGvNZWwqquLw`)

#### Другие workflows (требуется дополнительная проверка)
- Workflow 1 - TikTok Parser
- Workflow 2 - Instagram Parser
- Workflow 4 - YouTube Parser
- Workflow 0 - AI Orchestrator
- И другие...

---

## 📋 План исправления

### Шаг 1: Создать недостающие credentials в n8n

Необходимо создать через UI n8n:

1. **ScraperCreators API** (`httpHeaderAuth`)
   - Header: `x-api-key`
   - Value: ваш API ключ

2. **Google Sheets OAuth2** (если `VYgLH1nyxvDHNqbF` не покрывает все)
   - Настроить OAuth2 подключение

3. **Google Docs OAuth2**
   - Настроить OAuth2 подключение

4. **OpenAI API** (если `BPj3GH3bI2f4q6aI` не покрывает все)
   - API Key: ваш ключ OpenAI

5. **Telegram Bot** (если `RpN2LGvNZWwqquLw` не покрывает все)
   - Bot Token: ваш токен

### Шаг 2: Получить ID созданных credentials

После создания каждого credential в n8n UI:
- Перейти в Settings → Credentials
- Открыть каждый credential
- Скопировать ID из URL (формат: `/credentials/[ID]`)

### Шаг 3: Заменить placeholders на реальные ID

Обновить в workflows:
```javascript
// Было:
"credentials": {
  "httpHeaderAuth": {
    "id": "SCRAPERCREATORS_CREDENTIALS_ID",
    "name": "ScraperCreators API"
  }
}

// Станет:
"credentials": {
  "httpHeaderAuth": {
    "id": "abc123xyz456", // реальный ID
    "name": "ScraperCreators API"
  }
}
```

### Шаг 4: Проверить через n8n API

После обновления загрузить workflows обратно через API и проверить активацию.

---

## 🔐 Рекомендации по безопасности

1. **НЕ комитить** реальные credential IDs в GitHub
2. Использовать **environment variables** для чувствительных данных
3. Создать `.env` файл локально с реальными ID
4. В репозиторий загружать только workflows с placeholders
5. Документировать какой placeholder соответствует какому credential

---

## ✅ Следующие шаги

1. ✅ Карта credentials составлена
2. ⏳ Создать credentials в n8n UI
3. ⏳ Получить реальные ID
4. ⏳ Обновить все workflows с реальными ID
5. ⏳ Загрузить исправленные workflows через API
6. ⏳ Активировать workflows
7. ⏳ Протестировать каждый workflow

---

**Примечание:** Большинство workflows (1, 2, 4, 0 и другие) требуют полной проверки на наличие placeholders. Этот отчет основан на частичном сканировании.
