// ===== BUSINESS SETTINGS =====

const businessName = "AWTE Cool Solutions And PCB Repair";

const googleReviewLink =
"https://g.page/r/CTOomNcWlZN2EBM/review";


// ===== REVIEW TEMPLATES =====

const templates = {

  en: {
    intro: [
      "Excellent experience with",
      "Very satisfied with the service at",
      "Highly impressed by",
      "Great repair service from",
      "Professional work done by"
    ],

    middle: [
      "the technician was skilled and helpful.",
      "repair was done quickly and professionally.",
      "pricing was honest and affordable.",
      "communication was clear and transparent.",
      "issue was fixed perfectly."
    ],

    ending: [
      "Highly recommended!",
      "Will definitely visit again.",
      "Great service overall.",
      "Trusted repair shop.",
      "Five star experience."
    ]
  },


  hi: {
    intro: [
      "बहुत अच्छा अनुभव रहा",
      "सर्विस से पूरी तरह संतुष्ट हूँ",
      "यहाँ की सेवा शानदार रही",
      "बहुत प्रोफेशनल काम किया गया",
      "बहुत बढ़िया रिपेयर सर्विस मिली"
    ],

    middle: [
      "टेक्नीशियन बहुत मददगार था।",
      "रिपेयर जल्दी और सही तरीके से हुआ।",
      "प्राइसिंग ईमानदार और सही थी।",
      "पूरा काम प्रोफेशनल तरीके से हुआ।",
      "समस्या पूरी तरह ठीक हो गई।"
    ],

    ending: [
      "जरूर रिकमेंड करूंगा।",
      "फिर से सर्विस लूंगा।",
      "बहुत भरोसेमंद जगह है।",
      "शानदार अनुभव।",
      "Highly recommended."
    ]
  },


  mr: {
    intro: [
      "खूप छान अनुभव आला",
      "सेवा खूप समाधानकारक होती",
      "प्रोफेशनल काम केले",
      "रिपेअर सर्विस उत्कृष्ट होती",
      "खूप विश्वासार्ह सेवा मिळाली"
    ],

    middle: [
      "टेक्निशियन खूप मदत करणारा होता.",
      "काम जलद आणि व्यवस्थित झाले.",
      "किंमत योग्य आणि प्रामाणिक होती.",
      "समस्या पूर्णपणे सुटली.",
      "संपूर्ण अनुभव खूप चांगला होता."
    ],

    ending: [
      "नक्की भेट द्या.",
      "पुन्हा सेवा घेईन.",
      "विश्वास ठेवण्यासारखी जागा.",
      "खूप समाधान.",
      "Highly recommended."
    ]
  }

};


// ===== APP STATE =====

let currentLang = "en";
let shownCount = 0;
const batchSize = 10;
let generatedReviews = [];


// ===== HELPERS =====

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createReview(lang) {

  const t = templates[lang];

  return (
    randomItem(t.intro) + " " +
    businessName + ". " +
    randomItem(t.middle) + " " +
    randomItem(t.ending)
  );
}


// ===== BUILD 100 UNIQUE REVIEWS =====

function buildPool() {

  generatedReviews = [];
  const used = new Set();

  while (used.size < 100) {
    used.add(createReview(currentLang));
  }

  generatedReviews = [...used];
  shownCount = 0;
}


// ===== LOAD MORE =====

function loadMore() {

  const box = document.getElementById("reviews");

  for (let i = 0; i < batchSize; i++) {

    if (shownCount >= generatedReviews.length) {
      document.getElementById("loadMoreBtn").style.display = "none";
      return;
    }

    const review = generatedReviews[shownCount];
    shownCount++;

    const card = document.createElement("div");
    card.className = "review-card";

    const text = document.createElement("p");
    text.textContent = review;

    const btn = document.createElement("button");
    btn.textContent = "Post Review";
    btn.className = "post-btn";
    btn.onclick = () => postReview(review);

    card.appendChild(text);
    card.appendChild(btn);

    box.appendChild(card);
  }
}


// ===== LANGUAGE SWITCH =====

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById("reviews").innerHTML = "";
  document.getElementById("loadMoreBtn").style.display = "block";
  buildPool();
  loadMore();
}


// ===== COPY + OPEN GOOGLE =====

function postReview(text) {

  navigator.clipboard.writeText(text).then(() => {

    window.open(googleReviewLink, "_blank");

    alert("Review copied 👍 Paste and press POST.");

  });
}


// ===== INIT =====

buildPool();
loadMore();
