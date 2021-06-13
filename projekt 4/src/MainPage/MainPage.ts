import "./MainPage.scss";

const selectColors = [
  {
    id: "lightsalmon",
    color: "lightsalmon",
  },
  {
    id: "teal",
    color: "teal",
  },
  {
    id: "lightblue",
    color: "lightblue",
  },
  {
    id: "yellow",
    color: "yellow",
  },
  {
    id: "green",
    color: "green",
  },
  {
    id: "lightgrey",
    color: "lightgrey",
  },
];

const dataStructure = [
  {
    id: 1,
    tittle: "Title",
    content:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    color: "green",
    archived: false,
    favourite: false,
    creationDate: "10-03-2021",
  },
];

let getData: any = JSON.parse(localStorage.getItem("myNotes"));

const newDataStructure: {
  id: string;
  tittle: string;
  content: string;
  color: string;
  archived: boolean;
  favourite: boolean;
  creationDate: string;
}[] = [];

if (getData !== null) {
  newDataStructure.push(...getData);

} else {
  localStorage.setItem("myNotes", JSON.stringify([]));
  window.location.reload();
}

export class MainPage {
  constructor() { }
  Main() {
    this.AddNote();
    getData.map(
      (v: {
        id: string;
        tittle: string;
        content: string;
        color: any;
        archived: boolean;
        favourite: boolean;
      }) => {
        this.NoteBox(
          v.id,
          v.tittle,
          v.content,
          v.color,
          v.archived,
          v.favourite
        );
      }
    );
  }
  AddNote() {
    const container: HTMLElement = document.createElement("div");
    const inputTittle: HTMLInputElement = document.createElement("input");
    const inputContent: HTMLTextAreaElement =
      document.createElement("textarea");
    const inputConfirm: HTMLButtonElement = document.createElement("button");

    let colorMemory = "";
    container.className = "addNote";
    inputTittle.className = "inputTittle";
    inputContent.className = "inputContent";
    inputConfirm.className = "inputConfirm";

    inputTittle.placeholder = "Tittle";
    inputContent.placeholder = "Note";
    inputConfirm.innerHTML = "ADD";

    container.id = "addNote";
    inputTittle.id = "inputTittle";
    inputContent.id = "inputContent";
    inputConfirm.id = "inputConfirm";



    document.getElementById("globalAddNote").appendChild(container);
    container.appendChild(inputTittle);
    container.appendChild(inputContent);

    selectColors.map((d) => {
      const colorPicker: HTMLElement = document.createElement("div");
      colorPicker.className = "colorPicker";
      colorPicker.id = d.id;
      colorPicker.style.backgroundColor = d.color;
      container.appendChild(colorPicker);

      colorPicker.addEventListener("click", function () {
        colorMemory = colorPicker.id;
        inputConfirm.style.color = colorPicker.id;
        inputConfirm.style.border = `1px solid ${colorPicker.id}`;
      });
    });
    container.appendChild(inputConfirm);

    inputConfirm.addEventListener("click", function () {
      newDataStructure.push({
        id: `id_${inputTittle.value}_${colorMemory}_${Math.floor(
          Math.random() * 10000
        )}`,
        tittle: inputTittle.value,
        content: inputContent.value,
        color: colorMemory,
        archived: false,
        favourite: false,
        creationDate: "11-02-21",
      });
      localStorage.setItem("myNotes", JSON.stringify(newDataStructure));
      window.location.reload();
    });
  }
  NoteBox(
    id: string,
    tittle: string,
    contentTxt: string,
    color: any,
    archived: boolean,
    favourite: boolean
  ) {
    const container: HTMLElement = document.createElement("div");
    const titleTools: HTMLElement = document.createElement("div");
    const fav: HTMLElement = document.createElement("div");
    const deleteButton: HTMLElement = document.createElement("div");
    const content: HTMLElement = document.createElement("div");

    container.className = "noteBox";
    titleTools.className = "titleTools";
    fav.className = "fav";
    deleteButton.className = "deleteButton";
    content.className = "noteBoxContent";

    container.id = id;
    titleTools.id = "titleTools";
    fav.id = "fav";
    deleteButton.id = "deleteButton";
    content.id = "content";

    container.style.backgroundColor = color;
    container.style.borderColor = color;

    titleTools.innerHTML = tittle;
    fav.innerHTML = "fav";
    deleteButton.innerHTML = "✖";
    content.innerHTML = contentTxt;

    if (favourite) {
      document.getElementById("globalFavourite").appendChild(container);
      fav.className = "fav";
      fav.addEventListener("click", function () {
        newDataStructure.map((v) => {
          if (v.id === container.id) {
            v.favourite = !v.favourite;
            localStorage.setItem("myNotes", JSON.stringify(newDataStructure));
          }
        });
        window.location.reload();
      });
      deleteButton.addEventListener("click", function () {
        newDataStructure.map((v) => {
          if (v.id === container.id) {
            console.log(newDataStructure.indexOf(v));
            const index: number = newDataStructure.indexOf(v);
            localStorage.setItem(
              "myNotes",
              JSON.stringify(
                newDataStructure.filter(function (deleted) {
                  return deleted != newDataStructure[index];
                })
              )
            );
          }
        });
        window.location.reload();
      });
      container.appendChild(deleteButton);
      container.appendChild(fav);
      container.appendChild(titleTools);
      container.appendChild(content);
    } else {
      document.getElementById("globalNotes").appendChild(container);
      fav.className = "noFav";
      fav.addEventListener("click", function () {
        newDataStructure.map((v) => {
          if (v.id === container.id) {
            v.favourite = !v.favourite;
            localStorage.setItem("myNotes", JSON.stringify(newDataStructure));
          }
        });
        window.location.reload();
      });
      deleteButton.addEventListener("click", function () {
        newDataStructure.map((v) => {
          if (v.id === container.id) {
            console.log(newDataStructure.indexOf(v));
            const index: number = newDataStructure.indexOf(v);
            localStorage.setItem(
              "myNotes",
              JSON.stringify(
                newDataStructure.filter(function (deleted) {
                  return deleted != newDataStructure[index];
                })
              )
            );
          }
        });
        window.location.reload();
      });
      container.appendChild(deleteButton);
      container.appendChild(fav);
      container.appendChild(titleTools);
      container.appendChild(content);
    }
  }

  getDateToday() {
    let today: any = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }
}
