/**
 * Сервис для взаимодействия с Google Gemini API
 */

/**
 * Очищает ответ Gemini от маркдаун-форматирования
 */
function cleanGeminiResponse(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Убираем жирный текст
    .replace(/\*(.*?)\*/g, '$1')     // Убираем курсив
    .trim();
}

/**
 * Отправляет запрос к API Gemini и возвращает ответ
 * @param prompt Текст запроса к AI
 * @returns Ответ от Gemini API
 */
export async function askGemini(prompt: string): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("API ключ Gemini не найден");
      return "API ключ не настроен. Пожалуйста, проверьте конфигурацию.";
    }
    
    console.log("Отправка запроса к Gemini API с промптом:", prompt);
    
    // Максимально простой запрос с минимумом параметров
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: prompt }] 
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Получен ответ от API:", data);
    
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0] && 
        data.candidates[0].content.parts[0].text) {
      
      const text = data.candidates[0].content.parts[0].text;
      console.log("Успешно извлечен текст ответа:", text);
      return cleanGeminiResponse(text);
    } else {
      console.error("Неожиданный формат ответа:", data);
      return "Извините, получен неожиданный формат ответа.";
    }
  } catch (error) {
    console.error("Ошибка при запросе к Gemini API:", error);
    return "Произошла ошибка при общении с AI. Пожалуйста, попробуйте позже.";
  }
} 