const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const bmiResults = document.querySelector("#bmi-results");
const calculateBmiBtn = document.querySelector("#calculate-bmi");
const aiResponse = document.querySelector("#ai-response");
const API_KEY =
  "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";

calculateBmiBtn.addEventListener("click", () => {
  if (height.value == "" || weight.value == "") return;
  let heightBmi = height.value / 100;
  let weightBmi = weight.value;
  let bmi = weightBmi / (heightBmi * heightBmi);
  bmiResults.textContent = `${bmi.toFixed(2)} kg/m²
`;
  sendMessage(heightBmi, weightBmi, bmi);
});

async function sendMessage(height, weight, bmi) {
  let message = `make a short comment on the health of a person ${height}cm tall ${weight} kg and a BMI of ${bmi} `;
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct",
          messages: [{ role: "user", content: message }],
        }),
      },
    );

    const data = await response.json();
    const aiMessage = marked.parse(data.choices[0].message.content);
    aiResponse.innerHTML = aiMessage;
  } catch (error) {
    console.log(error);
  }
}
