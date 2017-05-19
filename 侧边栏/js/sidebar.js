import base from './base'

export default class Sidebar extends base {
  constructor(box, data, config) {
    super();
    this.data = data;
    this.iconList = ["fa-dashboard", "fa-th", "fa-home", "fa-laptop", "fa-table", " fa-align-right", " fa-signal", " fa-beer", " fa-group",
      " fa-coffee", "fa-leaf", "fa-rss", " fa-trophy", "fa-magnet", " fa-tag", " fa-cog", "fa-credit-card", " fa-group"
    ];
    this.render(box);
  };
  renderUI() {
    let content = "";
    this.data.map((item, index) => {
      item.icon = this.iconList[index]
      let childrenContent = "";
      if (item.children && item.children.length > 0) {
        // 如果有子菜单
        item.children.map((item) => {
          item.icon = "fa-circle-o";
          // 二级菜单
          childrenContent += `<li><a href="#"><i class="icon fa ${item.icon}" data-id=${item.id}></i><span>${item.name}</span></a></li>`;
        })

        let childrenNode2 = `<ul class="treeview-menu">${childrenContent}</ul>`;
        // 一级菜单
        content += `
            <li>
              <a href="#"><i class="icon fa ${item.icon}" data-id=${item.id}></i>
              <span>${item.name}</span>
              <span class="pull-right-icon"><i class="fa  fa-angle-left"></i></span>
              </a>
              ${childrenNode2}
           </li>`
      } else {
        // 如果没有子菜单
        content += `
          <li>
           <a href="#">
            <i class="icon fa ${item.icon}" data-id=${item.name}></i><span>${item.name}</span>
           </a>
         </li>`
      }
    });
    let html = `<ul class="sidebar-menu ">
      ${content}
    </ul>
    `;


    this.sidebarBox = document.createElement("section");
    this.sidebarBox.className = "G_Sidebar"
    this.sidebarBox.innerHTML = html;
  };
  bindUI() {
    const that = this;
    const doc = document;
    const list = Array.from(that.sidebarBox.querySelectorAll("a"));

    list.map((item) => {
      // item.classlist("active"))
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        item.parentNode.classList.toggle("active");
        // 如果有子集
        if (item.nextElementSibling) {
          let height, len;
          // 当下拉框为打开的时候
          if (item.nextElementSibling.style.height !== "" && item.nextElementSibling.style.height !== "0px") {
            height = 0;
          } else {
            // 记录li的高度
            height = window.getComputedStyle(item.nextElementSibling.querySelector("li")).getPropertyValue("height").replace("px", "");
          }
          // 记录ul里li的个数
          len = item.nextElementSibling.querySelectorAll("li").length;
          // 设置ul的高
          item.nextElementSibling.style.height = height * len + 'px';
        }
        // 遍历其他全部子节点,去除样式
        let n = item.parentNode.parentNode.firstChild;

        if (item.nextElementSibling) {
          for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== item.parentNode) {
              n.classList.remove("active")

              while (n.querySelector("ul")) {
                n.querySelector("ul").style.height = 0;
                return
              }
            }
          }
        }
      }, true)
    })
  }
}