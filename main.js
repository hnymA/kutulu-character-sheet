let skillValue = 0;
let specialityValue = 0;
let injuryValue = 0;

const skillLength = 9;
const specialityLength = 12;

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
  const index = parseInt(found[1]);
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

function onClickOutput() {
  const playerName = document.getElementById(`player-name`).value;
  const characterName = document.getElementById(`character-name`).value;
  const title = document.getElementById(`title`).value;
  const remarks = document.getElementById(`remarks`).value;

  {
    let alertMessage = "";
    if (playerName === "") {
      alertMessage += "プレイヤー名を入力してください。\n";
    }
    if (skillValue > 13) {
      alertMessage += "能力値が上限を超えています。\n";
    }
    if (specialityValue > 10) {
      alertMessage += "専門分野が上限を超えています。\n";
    }
    if (alertMessage !== "") {
      alert(alertMessage);
      return;
    }
  }

  const outputData = {
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
      outputData.data.params.push({
        label: `${name}`,
        value: `${value}`,
      });
      outputData.data.commands += `{${name}}B6>=4 【${name}】\n`;
    }
  }
  for (i = 0; i < specialityLength; i++) {
    console.log(document.getElementById(`speciality-${i}-label`));
    const name = document.getElementById(`speciality-${i}-label`).textContent;
    const value = document.getElementById(`speciality-${i}-value`).innerText;
    const checked = parseInt(value) > 0;
    if (checked) {
      outputData.data.params.push({
        label: `${name}`,
        value: `${value}`,
      });
      outputData.data.commands += `{${name}}B6>=4 【${name}】\n`;
    }
  }
  outputData.data.commands = outputData.data.commands.trim();
  outputData.data.status.push({
    label: "負傷",
    value: `${injuryValue}`,
    max: 3,
  });
  outputData.data.memo =
    `プレイヤー名：${playerName}\nキャラクター名：${characterName}\n称号 / 肩書：${title}\n${remarks}`.trim();
  console.log(JSON.stringify(outputData));
  navigator.clipboard.writeText(JSON.stringify(outputData));
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
