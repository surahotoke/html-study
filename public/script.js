console.log("Hello world!");
let selectedElement = null; // 直前に選択した要素を保存
let selectedText = ""; // コピーしたテキストを保存

// クリックした要素を選択する関数
document.querySelectorAll("*").forEach((element) => {
  element.addEventListener("contextmenu", function (event) {
    if (
      event.target.closest("#context-menu") ||
      event.target.closest("header a")
    )
      return;
    event.stopPropagation(); // イベントのバブリングを防ぐ
    selectedElement = this; // クリックした要素を保存
    if (this.tagName === "INPUT" || this.tagName === "TEXTAREA") {
      selectedText = this.value; // 入力要素の場合はvalueを取得
    } else {
      selectedText = this.innerHTML; // テキストを取得
    }
    console.log(`選択された要素: ${selectedElement.tagName} - ${selectedText}`);

    // メニューを表示する
    const menu = document.getElementById("context-menu");
    menu.style.display = "block";
    menu.style.left = event.pageX + "px"; // マウスのX位置
    menu.style.top = event.pageY + "px"; // マウスのY位置
  });
});

// メニューの外側をクリックしたら非表示にする
document.addEventListener("click", function () {
  const menu = document.getElementById("context-menu");
  menu.style.display = "none"; // メニューを隠す
});

// コピー関数
function copy() {
  if (selectedElement) {
    navigator.clipboard.writeText(selectedText); // クリップボードにコピー
    alert(`コピーしました: ${selectedText}`);
  } else {
    alert("要素を選択してください！");
  }
}

// 切り取り関数
function cut() {
  if (selectedElement) {
    navigator.clipboard.writeText(selectedText); // クリップボードにコピー
    if (
      selectedElement.tagName === "INPUT" ||
      selectedElement.tagName === "TEXTAREA"
    ) {
      selectedElement.value = ""; // 入力要素の場合はvalueをクリア
    } else {
      selectedElement.innerHTML = ""; // 要素のテキストをクリア
    }
    alert(`切り取りました: ${selectedText}`);
    selectedElement = null; // 選択をクリア
    const menu = document.getElementById("context-menu");
    menu.style.display = "none"; // メニューを隠す
  } else {
    alert("要素を選択してください！");
  }
}

// 貼り付け関数
function paste() {
  if (selectedElement) {
    navigator.clipboard.readText().then((text) => {
      // ボタンやメニュー内のテキストは変更しない
      if (
        selectedElement.tagName === "INPUT" ||
        selectedElement.tagName === "TEXTAREA"
      ) {
        selectedElement.value = text; // 入力要素に貼り付け
      } else {
        selectedElement.innerHTML = text; // 他の要素に貼り付け
      }
      alert(`貼り付けました: ${text}`);
      const menu = document.getElementById("context-menu");
      menu.style.display = "none"; // メニューを隠す
    });
  } else {
    alert("要素を選択してください！");
  }
}

let previousElements = [];
function highlightTags() {
  previousElements.forEach((element) => {
    element.style.backgroundColor = "";
  });
  previousElements = [];
  const tagName = document.getElementById("tag-search").value;
  if (tagName === "") {
    return;
  }
  const elements = document.getElementsByTagName(tagName);
  for (const element of elements) {
    previousElements.push(element);
    element.style.backgroundColor = "yellow";
  }
  if (elements.length === 0) {
    alert(`タグ <${tagName}> は見つかりませんでした。`);
  }
}

function add_shop() {
  window.open("https://example.com/magic_book", "_blank");
}
fetch("public/index.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    document.getElementById("myself-html").textContent = data;
  })
  .catch((error) => {
    console.error("Error fetching the script:", error);
  });

fetch("public/style.css")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    document.getElementById("myself-css").textContent = data;
  })
  .catch((error) => {
    console.error("Error fetching the script:", error);
  });

fetch("public/script.js")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    document.getElementById("myself-javascript").textContent = data;
  })
  .catch((error) => {
    console.error("Error fetching the script:", error);
  });

const button = document.getElementById("resizeBtn");
button.addEventListener("click", () => {
  const w = document.getElementById("w").value;
  const textParagraph = document.getElementById("resizerable-text");
  textParagraph.style.width = `${w}em`; // 横幅を設定
});

function changeColor() {
  let svgObject = document.getElementById("mySvg");
  let svgDoc = svgObject.contentDocument;
  let element = svgDoc.getElementById("svgElementId");
  element.style.fill = "pink";
}

function showModal() {
  const dialog = document.getElementById("dialog");
  dialog.showModal();
}
function closeModal() {
  const dialog = document.getElementById("dialog");
  dialog.close();
}

customElements.define(
  "original-element",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById(
        "original-element-template"
      ).content;
      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        template.cloneNode(true)
      );
    }
  }
);
