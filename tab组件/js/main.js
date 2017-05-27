import Base from "./base";
class MyTabs extends Base {
  constructor(option) {
    super()
    this.option = {
      hander: "mouseover",
      status: 1,
      fade: true,
      controlTitle: ["选项一", "选项二", "选项三"],
      body:[{
        type: "text",
        Class: "tabsText",
        inner: '1'
      },{
        type: "text",
        Class: "tabsText",
        inner: '2'
      },{
        type: "text",
        Class: "tabsText",
        inner: '3'
      }]
    }
    this.option = Object.assign(this.option, option)
    this.status = this.option.status;
    console.log(option)
    this.render()
  }
  renderUI() {
    const doc = document;

    let contains = ""
    this.option.body.map((item) => {
      switch (item.type) {
        case "img":
          contains += ` <li class="tab-item ${item.Class}"><img src="${item.src}" alt="${item.describe}"></li>`
          break;
        case "text":
          contains += ` <li class="tab-item ${item.Class}"><p>${item.inner}</p></li>`
          break;
        case "div":
          contains += ` <li class="tab-item ${item.Class}">${item.inner}</li>`
          break;
      }
    })

    let html = `
        <ul class="tab-header">
        ${this.option.controlTitle.map((item,inx)=>{
          return `<li class="tab-control">
            <a href="javascript:void(0)" data-status="${inx+1}">${item}</a>
              </li>`
        })}
        </ul>
        <div class="tab-body">
          <ul>
           ${contains}
          </ul>
        </div>
    `

    this.box = document.createElement("section");
    this.box.className = "G_tab";
    this.box.innerHTML = html.replace(/,/g, "").trim()

    const li = (this.box.querySelectorAll("li")),
      {
        length
      } = this.box.querySelectorAll(".tab-header li");


    let status = this.option.status > length ? 1 : this.option.status;

    li[status - 1].classList.add("active");
    li[status + length - 1].classList.add("active");
  }
  bindUI() {
    const that = this;
    this.box.addEventListener(this.option.hander, (e) => {
      let target = e.target;

      that.fire("clickHandle", target)
    }, true)
    that.on("clickHandle", (target) => {
      that.status = target.dataset.status;

      if (target.parentNode.classList.contains("tab-control")) {
        Array.from(document.querySelectorAll(".tab-control")).map((item) => {
          item.classList.contains("active") ? item.classList.remove("active") : "";
        })

        target.parentNode.classList.add("active");
        that.fire("changgeBody");
      }
    });
    that.on("changgeBody", () => {
      let item = Array.from(document.querySelectorAll(".tab-item"));
      item.map((i) => {
        i.classList.remove("active");
      })
      item[this.status - 1].classList.add("active");
    })
  }
}


window.MyTabs = MyTabs;