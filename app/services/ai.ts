import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function getChatResponse(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "شما یک دستیار هوشمند متخصص در زمینه ارزها هستید. شما می‌توانید به سوالات کاربران در مورد نرخ ارز، تحلیل بازار، و پیش‌بینی قیمت‌ها پاسخ دهید."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || 'متاسفانه نتوانستم پاسخی پیدا کنم.';
  } catch (error) {
    console.error('Error in AI chat:', error);
    return 'متاسفانه در ارتباط با سرویس هوش مصنوعی مشکلی پیش آمده است.';
  }
} 