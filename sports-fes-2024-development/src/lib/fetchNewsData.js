const newsValues = [];

export async function fetchNewsData() {
  try {
    var scriptUrl = "https://script.google.com/macros/s/AKfycbzrwkYzBHwSDlJfmXd9P5xqOcbAInyNuQA11bQmjfPyJAHpVplcghWdW7b7NZd_rK4Q/exec";
    // fetchを使用してデータを取得
    const newNewsValues = [];

    const response = await fetch(scriptUrl);
    const jsonData = await response.json();
    const data = jsonData[0];
    for (let i = 0; i < data.length; i++) {
      let nowTime = new Date(data[i][1]);
      const jpDateTimeFormat = new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo',
        hour12: false,
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      newNewsValues.push({
        content: data[i][0],
        // 日本時間でフォーマットした時刻を取得（時:分）
        updateAt: jpDateTimeFormat.format(nowTime),
      });
    }

    newsValues.splice(0, newsValues.length, ...newNewsValues);
    
    console.log(newsValues);

    return newsValues;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
