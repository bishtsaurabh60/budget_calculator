// UI CONTROLLER

const DOMstrings = {
  inputType: ".add__type",
  inputDescription: ".add__description",
  inputValue: ".add__value",
  inputBtn: ".add__btn",
  incomeContainer: ".income__list",
  expensesContainer: ".expenses__list",
  budgetLabel: ".budget__value",
  incomeLabel: ".budget__income--value",
  expensesLabel: ".budget__expenses--value",
  percentageLabel: ".budget__expenses--percentage",
  container: ".container",
  expensesPercLabel: ".item__percentage",
  dateLabel: ".budget__title--month",
};

const formatNumber = function (num, type) {
  let numSplit, int, dec;
  /*
                + or - before number
                exactly 2 decimal points
                comma separating the thousands
    
                2310.4567 -> + 2,310.46
                2000 -> + 2,000.00
                */
  num = Math.abs(num);
  num = num.toFixed(2);

  numSplit = num.split(".");

  int = numSplit[0];
  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3); //input 23510, output 23,510
  }

  dec = numSplit[1];

  return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
};

const nodeListForEach = (list, callback) => {
  for (let i = 0; i < list.length; i++) {
    callback(list[i], i);
  }
};

const UIController = () => {
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    addListItem: function (obj, type) {
      let html, newHtml, element;
      // Create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html =
          `<div class="item" id="inc-%id%"> 
              <div class="item__description">%description%</div>
                <div class="right itemFlex">
                  <div class="item__value">%value%</div>
                  <div class="item__delete">
                    <button class="item__delete--btn">
                      <i class="ion-ios-close-outline"></i>
                     </button>
                   </div>
                </div>
            </div>`;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        html =
          '<div class="item" id="exp-%id%"><div class="item__description">%description%</div><div class="right itemFlex"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function (selectorID) {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function () {
      let fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function (obj) {
      const type = obj.budget > 0 ? "inc" : "exp";

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expensesLabel).textContent =
        formatNumber(obj.totalExp, "exp");

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    displayPercentages: function (percentages) {
      let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      nodeListForEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }
      });
    },

    displayMonth: function () {
      const now = new Date();

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = now.getMonth();

      const year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent =
        months[month] + " " + year;
    },

    changedType: function () {
      let fields = document.querySelectorAll(
        DOMstrings.inputType +
          "," +
          DOMstrings.inputDescription +
          "," +
          DOMstrings.inputValue
      );

      nodeListForEach(fields, function (cur) {
        cur.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
};

const UICtrl = UIController();

export default UICtrl;
