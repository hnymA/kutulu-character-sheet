let skillValue = 0;
let specialityValue = 0;
let injuryValue = 0;

const skillLength = 9;
const specialityLength = 12;
const injuryLength = 3;

function onClickSkill(id) {
  const found = id.match(/skill-(.*)-(.*)/);
  const index = parseInt(found[1]);
  const value = parseInt(found[2]);
  const beforeValue = parseInt(
    document.getElementById(`skill-${index}-value`).innerText
  );
  document.getElementById(`skill-${index}-value`).innerText = `${value}`;
  skillValue += value - beforeValue;
  document.getElementById(`skill-value`).innerText = `${skillValue}/13`;
  if (skillValue > 13) {
    document.getElementById(`skill-value`).classList.add("has-text-danger");
    document.getElementById(`skill-value`).classList.remove("has-text-dark");
  } else {
    document.getElementById(`skill-value`).classList.remove("has-text-danger");
    document.getElementById(`skill-value`).classList.add("has-text-dark");
  }
}

function onClickInjury(id) {
  const found = id.match(/injury-(.*)/);
  const value = document.getElementById(`${id}`).checked;
  if (value) {
    injuryValue++;
  } else {
    injuryValue--;
  }
  document.getElementById(`injury-value`).innerText = `${injuryValue}/3`;
}

function onClickSpeciality(id) {
  const found = id.match(/speciality-(.*)-(.*)/);
  const index = parseInt(found[1]);
  const value = parseInt(found[2]);
  const beforeValue = parseInt(
    document.getElementById(`speciality-${index}-value`).innerText
  );
  document.getElementById(`speciality-${index}-value`).innerText = `${value}`;
  specialityValue += value - beforeValue;
  document.getElementById(
    `speciality-value`
  ).innerText = `${specialityValue}/10`;
  if (specialityValue > 10) {
    document
      .getElementById(`speciality-value`)
      .classList.add("has-text-danger");
    document
      .getElementById(`speciality-value`)
      .classList.remove("has-text-dark");
  } else {
    document
      .getElementById(`speciality-value`)
      .classList.remove("has-text-danger");
    document.getElementById(`speciality-value`).classList.add("has-text-dark");
  }
}

function _getValues() {
  const playerName = document.getElementById(`player-name`).value;
  const characterName = document.getElementById(`character-name`).value;
  const title = document.getElementById(`title`).value;
  const remarks = document.getElementById(`remarks`).value;

  const data = {
    kind: "character",
    data: {
      name: `${playerName}`,
      memo: "",
      initiative: 0,
      params: [],
      status: [],
      commands: "",
    },
  };
  for (i = 0; i < skillLength; i++) {
    const name = document.getElementById(`skill-${i}-label`).textContent;
    const value = document.getElementById(`skill-${i}-value`).innerText;
    const checked = parseInt(value) > 0;
    if (checked) {
      data.data.params.push({
        label: `${name}`,
        value: `${value}`,
      });
      data.data.commands += `{${name}}B6>=4 【${name}】\n`;
    }
  }
  for (i = 0; i < specialityLength; i++) {
    const name = document.getElementById(`speciality-${i}-label`).textContent;
    const value = document.getElementById(`speciality-${i}-value`).innerText;
    const checked = parseInt(value) > 0;
    if (checked) {
      data.data.params.push({
        label: `${name}`,
        value: `${value}`,
      });
      data.data.commands += `{${name}}B6>=4 【${name}】\n`;
    }
  }
  data.data.commands = data.data.commands.trim();
  data.data.status.push({
    label: "負傷",
    value: `${injuryValue}`,
    max: 3,
  });
  data.data.memo =
    `プレイヤー名：${playerName}\nキャラクター名：${characterName}\n称号 / 肩書：${title}\n${remarks}`.trim();
  return data;
}

function _setValues(data) {
  skillValue = 0;
  for (i = 0; i < skillLength; i++) {
    document.getElementById(`skill-${i}-value`).innerText = "0";
    document.getElementById(`skill-${i}-0`).checked = true;
  }
  document.getElementById(`skill-value`).innerText = `${skillValue}/13`;
  specialityValue = 0;
  for (i = 0; i < specialityLength; i++) {
    document.getElementById(`speciality-${i}-value`).innerText = "0";
    document.getElementById(`speciality-${i}-0`).checked = true;
  }
  document.getElementById(
    `speciality-value`
  ).innerText = `${specialityValue}/10`;
  injuryValue = 0;
  for (i = 0; i < injuryLength; i++) {
    document.getElementById(`injury-${i}`).false = true;
  }
  document.getElementById(`injury-value`).innerText = `${injuryValue}/3`;
  document.getElementById(`remarks`).value = "";

  const memoArray = data.data.memo.split("\n");
  document.getElementById(`player-name`).value =
    memoArray[0].match(/プレイヤー名：(.*)/)[1];
  document.getElementById(`character-name`).value =
    memoArray[1].match(/キャラクター名：(.*)/)[1];
  document.getElementById(`title`).value =
    memoArray[2].match(/称号 \/ 肩書：(.*)/)[1];
  document.getElementById(`remarks`).value =
    memoArray[3] === undefined ? "" : memoArray[3];

  for (i = 0; i < skillLength; i++) {
    const name = document.getElementById(`skill-${i}-label`).textContent;
    const found = data.data.params.find((element) => element.label === name);
    if (found !== undefined) {
      document.getElementById(`skill-${i}-value`).innerText = found.value;
      document.getElementById(`skill-${i}-${found.value}`).checked = true;
      skillValue += parseInt(found.value);
    }
  }
  document.getElementById(`skill-value`).innerText = `${skillValue}/13`;
  for (i = 0; i < specialityLength; i++) {
    const name = document.getElementById(`speciality-${i}-label`).textContent;
    const found = data.data.params.find((element) => element.label === name);
    if (found !== undefined) {
      document.getElementById(`speciality-${i}-value`).innerText = found.value;
      document.getElementById(`speciality-${i}-${found.value}`).checked = true;
      specialityValue += parseInt(found.value);
    }
  }
  document.getElementById(
    `speciality-value`
  ).innerText = `${specialityValue}/10`;
  injuryValue = parseInt(data.data.status[0].value);
  document.getElementById(`injury-value`).innerText = `${injuryValue}/3`;
  for (i = 0; i < injuryValue; i++) {
    document.getElementById(`injury-${i}`).checked = true;
  }
}

function _validateData() {
  const playerName = document.getElementById(`player-name`).value;
  const characterName = document.getElementById(`character-name`).value;
  const title = document.getElementById(`title`).value;
  let alertMessage = "";
  if (playerName === "") {
    alertMessage += "プレイヤー名を入力してください。\n";
  }
  if (characterName === "") {
    alertMessage += "キャラクター名を入力してください。\n";
  }
  if (title === "") {
    alertMessage += "称号 / 肩書を入力してください。\n";
  }
  if (skillValue > 13) {
    alertMessage += "能力値が上限を超えています。\n";
  }
  if (specialityValue > 10) {
    alertMessage += "専門分野が上限を超えています。\n";
  }
  if (alertMessage !== "") {
    alert(alertMessage);
    return false;
  }
  return true;
}

function onClickCopy() {
  if (!_validateData()) {
    return;
  }
  const value = JSON.stringify(_getValues());
  navigator.clipboard.writeText(value);
  alert("クリップボードにコピーしました。");
}

function onClickDownload() {
  if (!_validateData()) {
    return;
  }
  const value = JSON.stringify(_getValues());
  const characterName = document.getElementById(`character-name`).value;
  const blob = new Blob([value], {
    type: "text/plain",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${characterName}.json`;
  link.click();
}

function onChangeUpload() {
  const fileInput = document.getElementById("file-input");
  const fileName = document.getElementById("file-name");
  if (fileInput.files.length === 0) {
    return;
  }
  const fileReader = new FileReader();
  fileName.textContent = fileInput.files[0].name;
  fileReader.readAsText(fileInput.files[0]);
  fileReader.onload = function () {
    const data = JSON.parse(fileReader.result);
    _setValues(data);
    alert("ファイルを読み込みました。");
  };
}

window.onload = function () {
  document.getElementById(`skill-value`).innerText = `${skillValue}/13`;
  for (let i = 0; i < skillLength; i++) {
    document.getElementById(`skill-${i}-value`).innerText = "0";
  }
  document.getElementById(
    `speciality-value`
  ).innerText = `${specialityValue}/10`;
  document.getElementById("injury-value").innerText = `${injuryValue}/3`;
  for (let i = 0; i < specialityLength; i++) {
    document.getElementById(`speciality-${i}-value`).innerText = "0";
  }
};
