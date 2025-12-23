# 🚀 Пошаговая инструкция по установке

## Шаг 1: Подготовка окружения

### 1.1 Установка n8n

**Вариант A: Docker (рекомендуется)**

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Вариант B: npm**

```bash
npm install n8n -g
n8n start
```

Откройте браузер: `http://localhost:5678`

### 1.2 Создание аккаунтов

Вам понадобятся:

- ✅ **Google Account** (для Google Sheets)
- ✅ **GitHub Account** (для хранения промптов)
- ✅ **Anthropic Account** (Claude API) → https://console.anthropic.com
- ✅ **Threads Account** (или другая соцсеть)
- ✅ **Telegram Bot** → создайте через @BotFather

---

## Шаг 2: Настройка Google Sheets

### 2.1 Создание таблицы

1. Откройте Google Sheets
2. Создайте новую таблицу: "AI Content Automation"
3. Создайте следующие листы:

#### Лист: `tokens`

| token_type | access_token | refresh_token | expires_at |
|------------|--------------|---------------|------------|
| access_token | | | |

#### Лист: `news_sources`

| id | name | rss_url | active | category |
|----|------|---------|--------|----------|
| 1 | OpenAI Blog | https://openai.com/blog/rss.xml | TRUE | ai |
| 2 | Anthropic News | https://www.anthropic.com/news/rss | TRUE | ai |
| 3 | TechCrunch AI | https://techcrunch.com/category/artificial-intelligence/feed/ | TRUE | tech |

#### Лист: `filtered_news`

| id | title | link | source | should_publish | engagement_potential | key_points | suggested_angle | post_type | published | created_at |
|----|-------|------|--------|----------------|----------------------|------------|-----------------|-----------|-----------|------------|

#### Лист: `generated_posts`

| id | post_text | hashtags | call_to_action | news_id | pattern_type | post_type | published | published_at | threads_post_id | status | priority | created_at |
|----|-----------|----------|----------------|---------|--------------|-----------|-----------|--------------|-----------------|--------|----------|------------|

#### Лист: `carousel_posts`

| id | post_type | slides | caption | first_comment | news_id | created_at | status |
|----|-----------|--------|---------|---------------|---------|------------|--------|

#### Лист: `post_statistics`

| id | post_id | threads_post_id | pattern_type | post_type | published_at | views | likes | comments | shares | saves | engagement_rate | virality_score | retention_score | collected_at |
|----|---------|-----------------|--------------|-----------|--------------|-------|-------|----------|--------|-------|-----------------|----------------|-----------------|--------------|

#### Лист: `ml_insights`

| id | analysis_date | total_posts_analyzed | pattern_analysis | adaptations | best_posting_hours | best_post_length | avg_performance | recommendations |
|----|---------------|----------------------|------------------|-------------|--------------------|-----------------|-----------------|--------------------|

#### Лист: `github_prompts`

| id | type | prompts | updated_at |
|----|------|---------|------------|

### 2.2 Получение Google Sheets API ключа

1. Откройте https://console.cloud.google.com
2. Создайте новый проект
3. Включите Google Sheets API
4. Создайте Service Account
5. Скачайте JSON ключ
6. Дайте доступ к вашей таблице для email из Service Account

---

## Шаг 3: Настройка GitHub репозитория

### 3.1 Создание структуры

```bash
mkdir ai-content-prompts
cd ai-content-prompts

# Создаём структуру
mkdir -p prompts config backups

# Копируем примеры промптов
cp ../ai-content-automation/prompts-example/short-posts.json prompts/
cp ../ai-content-automation/prompts-example/carousel-posts.json prompts/

# Создаём базовый конфиг
cat > config/active-config.json << EOF
{
  "version": "1.0.0",
  "updated_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "patterns": {},
  "meta": {
    "best_hours": [14, 18, 21],
    "best_length": "medium"
  }
}
EOF

# Инициализация git
git init
git add .
git commit -m "Initial commit: AI content automation prompts"

# Создаём репозиторий на GitHub и пушим
# (замените YOUR_USERNAME на ваш username)
gh repo create ai-content-prompts --public --source=. --remote=origin --push
```

### 3.2 Настройка webhook

1. Откройте ваш репозиторий на GitHub
2. Settings → Webhooks → Add webhook
3. Payload URL: `https://YOUR-N8N-INSTANCE.com/webhook/github-prompts-update`
   - Если локально: используйте ngrok `ngrok http 5678`
   - Payload URL будет: `https://xxxxx.ngrok.io/webhook/github-prompts-update`
4. Content type: `application/json`
5. Secret: (оставьте пустым или создайте)
6. Events: выберите "Just the push event"
7. Active: ✅
8. Add webhook

---

## Шаг 4: Получение API ключей

### 4.1 Anthropic Claude API

1. Откройте https://console.anthropic.com
2. Создайте аккаунт
3. API Keys → Create Key
4. Скопируйте ключ (начинается с `sk-ant-`)
5. Сохраните в безопасном месте

**Цены (на момент написания):**
- Claude 3.5 Sonnet: $3 / 1M input tokens, $15 / 1M output tokens
- ~$0.01 за пост (~1000 токенов)

### 4.2 Threads API

**Важно:** На момент написания Threads API в закрытой бете.

**Альтернативы:**
- Twitter API v2
- LinkedIn API
- Instagram Graph API

Для Twitter:

1. Откройте https://developer.twitter.com
2. Создайте App
3. Получите:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret

### 4.3 Telegram Bot

1. Откройте Telegram
2. Найдите @BotFather
3. Отправьте `/newbot`
4. Следуйте инструкциям
5. Скопируйте Bot Token
6. Создайте канал или группу для мониторинга
7. Добавьте бота в группу
8. Получите Chat ID:

```bash
# Отправьте любое сообщение в группу
# Затем выполните:
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates

# Найдите "chat":{"id": -1234567890}
# Это ваш CHAT_ID
```

---

## Шаг 5: Импорт workflow в n8n

### 5.1 Загрузка файлов

1. Откройте n8n (`http://localhost:5678`)
2. Для каждого workflow файла:
   - Нажмите "Add workflow" → "Import from File"
   - Выберите файл (например, `01-token-refresh.json`)
   - Нажмите "Import"

Импортируйте все 7 файлов:
- ✅ `01-token-refresh.json`
- ✅ `02-news-monitoring.json`
- ✅ `03-short-posts.json`
- ✅ `04-carousel-posts.json`
- ✅ `05-full-posts-publishing.json`
- ✅ `06-github-sync.json`
- ✅ `07-analytics-adaptation.json`

### 5.2 Настройка Environment Variables

В n8n:

1. Settings → Variables
2. Добавьте переменные из `.env.example`:

```
GOOGLE_SHEET_ID=your_actual_sheet_id
THREADS_API_URL=https://graph.threads.net/v1.0
THREADS_USER_ID=your_user_id
GITHUB_OWNER=your_github_username
GITHUB_REPO=ai-content-prompts
GITHUB_PROMPTS_URL=https://raw.githubusercontent.com/your_username/ai-content-prompts/main
OAUTH_TOKEN_URL=https://oauth-provider.com/token
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REFRESH_TOKEN=your_refresh_token
TELEGRAM_MONITORING_CHAT_ID=-1234567890
TELEGRAM_REVIEW_CHAT_ID=-1234567891
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### 5.3 Настройка Credentials

Для каждого workflow нужно настроить credentials:

#### Google Sheets API

1. В workflow откройте Google Sheets node
2. Credentials → Create New
3. Выберите "Service Account"
4. Вставьте JSON из Service Account
5. Test connection
6. Save

#### Anthropic API

1. Откройте node с Anthropic Chat Model
2. Credentials → Create New
3. API Key: вставьте ваш Claude API ключ
4. Save

#### GitHub

1. Откройте GitHub node
2. Credentials → Create New
3. Access Token: создайте Personal Access Token на GitHub
   - Settings → Developer settings → Personal access tokens → Generate new token
   - Scopes: `repo`, `webhook`
4. Save

#### Telegram

1. Откройте Telegram node
2. Credentials → Create New
3. Access Token: вставьте Bot Token
4. Save

#### HTTP Request (для Threads)

1. Откройте HTTP Request node для Threads API
2. Credentials → Create New
3. Выберите "OAuth2"
4. Настройте OAuth для Threads

---

## Шаг 6: Тестирование

### 6.1 Тест каждого workflow

**Workflow 01: Token Refresh**
```
1. Откройте workflow
2. Нажмите "Execute Workflow"
3. Проверьте, что токен обновился в Google Sheets (лист tokens)
```

**Workflow 02: News Monitoring**
```
1. Убедитесь, что в Google Sheets (news_sources) есть RSS источники
2. Execute Workflow
3. Проверьте лист filtered_news - должны появиться новости
4. Проверьте Telegram - должно прийти уведомление
```

**Workflow 03: Short Posts**
```
1. Убедитесь, что есть данные в filtered_news с should_publish=true
2. Execute Workflow
3. Проверьте generated_posts - должен появиться новый пост
```

**Workflow 04: Carousel Posts**
```
1. Аналогично workflow 03
2. Проверьте carousel_posts
3. В Telegram должно прийти сообщение для ревью
```

**Workflow 05: Publishing**
```
1. Убедитесь, что есть посты со status=ready в generated_posts
2. Execute Workflow
3. Проверьте, что пост опубликован в соцсети
4. Проверьте, что published=true в Google Sheets
```

**Workflow 06: GitHub Sync**
```
1. Сделайте изменение в prompts/short-posts.json в GitHub
2. Commit и push
3. Workflow должен запуститься автоматически (через webhook)
4. Проверьте github_prompts в Google Sheets - должны обновиться
```

**Workflow 07: Analytics**
```
1. Убедитесь, что есть опубликованные посты со статистикой
2. Execute Workflow
3. Проверьте ml_insights - должен появиться анализ
4. Проверьте GitHub - должен создаться файл config
5. В Telegram придёт отчёт
```

### 6.2 Проверка автоматического запуска

Подождите несколько часов и проверьте:

- ✅ Токены обновляются каждые 12 часов
- ✅ Новости собираются каждые 6 часов
- ✅ Посты генерируются каждые 4 часа
- ✅ Публикация происходит каждые 2 часа
- ✅ Аналитика собирается каждые 6 часов

---

## Шаг 7: Активация системы

### 7.1 Активация всех workflow

Для каждого workflow:
1. Откройте workflow
2. В правом верхнем углу переключите "Inactive" → **"Active"**
3. Workflow должен стать зелёным

### 7.2 Мониторинг

Следите за системой через:

1. **n8n Executions** (история выполнений)
   - Workflow → Executions → смотрите логи

2. **Telegram уведомления**
   - Все важные события приходят в Telegram

3. **Google Sheets**
   - Все данные в реальном времени

### 7.3 Первые 2 недели

**Важно:** Первые 2 недели проверяйте каждый сгенерированный пост вручную!

1. Система ещё учится
2. Промпты могут требовать корректировки
3. ML-алгоритм собирает статистику

После 2 недель система начнёт работать автономно с высоким качеством.

---

## Шаг 8: Оптимизация

### 8.1 Настройка промптов

Отредактируйте `prompts/short-posts.json` под ваш стиль:

```json
{
  "your_pattern": {
    "name": "Ваш уникальный паттерн",
    "template": "...",
    "style": "...",
    "examples": [...]
  }
}
```

Commit → Push → Система автоматически подхватит.

### 8.2 Добавление источников новостей

В Google Sheets (news_sources) добавьте RSS фиды:

```
| id | name | rss_url | active | category |
|----|------|---------|--------|----------|
| 4 | Ваш источник | https://example.com/rss | TRUE | tech |
```

### 8.3 Настройка расписания

Измените интервалы в Schedule Trigger nodes:

```
Больше постов → уменьшите интервалы
Меньше постов → увеличьте интервалы
```

---

## Troubleshooting

### Проблема: "Error: 401 Unauthorized"

**Решение:** Проверьте API ключи и токены. Возможно, истекли.

### Проблема: Workflow не запускается автоматически

**Решение:**
1. Убедитесь, что workflow активен (зелёный)
2. Проверьте Schedule Trigger настройки
3. Проверьте логи в Executions

### Проблема: GitHub webhook не работает

**Решение:**
1. Проверьте URL webhook (Settings → Webhooks в GitHub)
2. Проверьте Recent Deliveries - там должны быть успешные доставки
3. Если локально - проверьте ngrok

### Проблема: LLM генерирует плохой контент

**Решение:**
1. Улучшите промпты (добавьте больше примеров)
2. Добавьте системные инструкции
3. Первые 2 недели проверяйте вручную

### Проблема: Низкий engagement

**Решение:**
1. Подождите 2-4 недели - система учится
2. ML-алгоритм найдёт лучшие паттерны
3. Экспериментируйте с временем публикации

---

## Поддержка

Если что-то не работает:

1. Проверьте логи в n8n (Executions)
2. Проверьте Telegram уведомления
3. Проверьте Google Sheets - все ли данные на месте

---

## Следующие шаги

После установки:

1. ✅ Дайте системе поработать 2 недели
2. ✅ Соберите статистику
3. ✅ Адаптируйте промпты под свою аудиторию
4. ✅ Наслаждайтесь автоматизацией! 🚀

---

**Готово! Ваша автономная система запущена.** 🎉
