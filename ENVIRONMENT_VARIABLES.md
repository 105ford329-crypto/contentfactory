# 🔐 Environment Variables Setup

**Дата:** 2026-01-15
**Где настраивать:** n8n → Settings → Variables → Environment

---

## 📋 Обязательные переменные

### 1. Google Sheets

```bash
GOOGLE_SHEET_ID=<ID_твоей_таблицы>
```

**Как получить:**
1. Открой созданную Google Sheet
2. Скопируй из URL часть между `/d/` и `/edit`
3. Например: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

**Используется в:**
- Workflow 1 - TikTok Parser
- Workflow 2 - Instagram Parser
- Workflow 4 - YouTube Parser
- Workflow 7 - YouTube Deep Analysis
- Workflow 8 - Pinterest Parser
- Workflow 9 - Cost Tracker
- Workflow 10 - Analytics
- Workflow 11 - Vector DB

---

### 2. Telegram Bot

```bash
TELEGRAM_CHAT_ID=<твой_chat_id>
TELEGRAM_BOT_TOKEN=<токен_бота>
```

**Как получить TELEGRAM_CHAT_ID:**
1. Открой Telegram
2. Напиши боту [@userinfobot](https://t.me/userinfobot)
3. Он вернёт твой Chat ID (число, например: `123456789`)

**Как получить TELEGRAM_BOT_TOKEN:**
1. Если бот уже создан - найди сообщение от [@BotFather](https://t.me/BotFather) с токеном
2. Формат: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
3. Если потерял - отправь `/token` BotFather и выбери своего бота

**Используется в:**
- Workflow 0 - AI Orchestrator
- Все парсеры (для уведомлений)
- Workflow 11 - Vector DB

---

### 3. OpenRouter (опционально)

```bash
OPENROUTER_REFERER=https://n8n.io
```

**Зачем:** Если используешь OpenRouter для доступа к AI моделям

**Используется в:**
- Возможно в Workflow 0 или 3 (нужно проверить)

---

## 🔑 Credentials (НЕ env vars, но нужно проверить)

Эти настраиваются через n8n → Settings → Credentials:

### ✅ Уже настроены:

1. **ScraperCreators API** (`fZGnjUIKCVNKz54C`)
   - Тип: HTTP Header Auth
   - Header: `x-api-key`

2. **Google Sheets Main** (`VYgLH1nyxvDHNqbF`)
   - Тип: OAuth2
   - Проверить: подключена ли нужная таблица?

3. **OpenAI account 4** (`BPj3GH3bI2f4q6aI`)
   - Тип: API Key
   - Проверить: есть ли баланс?

4. **Telegram VideoMaker** (`RpN2LGvNZWwqquLw`)
   - Тип: API Token
   - Проверить: правильный ли бот?

5. **Supabase video_maker** (`XavzftuBevmNShcu`)
   - Тип: API Key + URL
   - Проверить: создана ли таблица `documents`?

6. **Postgres Video_maker** (`9cRi0vqQ4mtxZPs2`)
   - Тип: Connection String
   - Проверить: доступна ли БД?

7. **Ideogram API** (`rrCVfNeSKnGe0r0G`)
   - Тип: HTTP Header Auth

8. **Creatomate API** (`QqD41oqOROB6DxXr`)
   - Тип: HTTP Header Auth

---

### ❌ Отсутствуют (нужно создать для полной функциональности):

9. **Anthropic (Claude) API**
   - Для: Workflow 0 (AI Orchestrator)
   - Тип: API Key
   - Получить на: https://console.anthropic.com/

10. **HeyGen API**
    - Для: Workflow 3 (Video Montage)
    - Тип: API Key
    - Получить на: https://heygen.com/

11. **Threads API**
    - Для: Workflow 6 (Threads Publisher)
    - Тип: OAuth2 или API Token
    - Получить: через Meta Developer Console

12. **Pinterest API**
    - Для: Workflow 12 (Pinterest Publisher)
    - Тип: OAuth2
    - Получить: https://developers.pinterest.com/

---

## 📝 Как добавить Environment Variables в n8n

### Способ 1: Через UI (рекомендуется)

1. Открой n8n в браузере
2. Перейди: **Settings** → **Variables** → **Environment**
3. Нажми **"Add Variable"**
4. Введи:
   - **Key:** `GOOGLE_SHEET_ID`
   - **Value:** `твой_ID_таблицы`
5. Нажми **Save**
6. Повтори для остальных переменных

### Способ 2: Через .env файл (если self-hosted)

Если n8n запущен через Docker или локально:

```bash
# Открой файл .env в корне n8n
nano .env

# Добавь переменные:
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
TELEGRAM_CHAT_ID=123456789
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
OPENROUTER_REFERER=https://n8n.io

# Сохрани и перезапусти n8n
docker-compose restart
```

---

## ✅ Проверка переменных

### Как проверить что переменные доступны:

1. Создай тестовый workflow
2. Добавь **Code** node
3. Вставь код:
```javascript
return [
  {
    json: {
      GOOGLE_SHEET_ID: $env.GOOGLE_SHEET_ID,
      TELEGRAM_CHAT_ID: $env.TELEGRAM_CHAT_ID,
      TELEGRAM_BOT_TOKEN: $env.TELEGRAM_BOT_TOKEN ? '***exists***' : 'missing',
      OPENROUTER_REFERER: $env.OPENROUTER_REFERER
    }
  }
];
```
4. Запусти workflow
5. Проверь вывод - все переменные должны быть видны

---

## 🎯 Минимальный набор для старта

Чтобы запустить **хотя бы парсеры**, нужны только:

```bash
GOOGLE_SHEET_ID=<твой_ID>
```

Остальные можно добавлять постепенно, когда будешь настраивать другие части системы.

---

## 📋 Чек-лист

### Обязательно для парсинга:
- [ ] `GOOGLE_SHEET_ID` - добавлен
- [ ] Google Sheets credential - проверен
- [ ] ScraperCreators API - проверен

### Для AI Orchestrator (Telegram Bot):
- [ ] `TELEGRAM_CHAT_ID` - добавлен
- [ ] `TELEGRAM_BOT_TOKEN` - добавлен
- [ ] Telegram credential - создан
- [ ] Anthropic API credential - создан

### Для Vector DB:
- [ ] Supabase credential - проверен
- [ ] OpenAI credential - проверен
- [ ] Таблица `documents` в Supabase - создана

### Для генерации контента:
- [ ] HeyGen API - создан (опционально)
- [ ] Ideogram API - проверен
- [ ] Creatomate API - проверен

### Для публикации:
- [ ] Threads API - создан (опционально)
- [ ] Pinterest API - создан (опционально)

---

## 🔗 Следующий шаг

После настройки environment variables:
1. Проверь все credentials
2. Настрой Telegram Bot webhook
3. Добавь executeWorkflowTrigger в workflows

---

**Готово!** Все переменные настроены ✅
