const tableBody = document.querySelector('#table-body');
const tableHead = document.querySelector("#table-head");

function renderElementFromJSON(
    tablePartNode,
    iterateKey,
    tablePartType
) {
    const tableNodeByType = () => {
        switch (tablePartType) {
            case 'head':
                iterateKey = iterateKey.replace('_', ' ');
                iterateKey = iterateKey.charAt(0).toUpperCase() + iterateKey.slice(1);

                return `<th>${iterateKey}</th>`;
                
            case 'body':
                return `<td>${iterateKey}</td>`;
        
            default:
                return null;
        }
    }
    
    tablePartNode.lastElementChild.insertAdjacentHTML(
      "afterbegin",
      tableNodeByType()
    );
    
}

fetch("https://api.npoint.io/1a33ecf254970beccc52")
  .then((response) => response.json())
  .then((json) => {
      
    // Table Head
    tableHead.insertAdjacentHTML("beforeend", "<tr></tr>");

    Object.keys(json[0]).forEach((key) => renderElementFromJSON(tableHead, key, 'head'));

    // Table Body
    json.forEach((item) => {
      tableBody.insertAdjacentHTML("beforeend", "<tr></tr>");

      Object.values(item).forEach((value) => renderElementFromJSON(tableBody, value, 'body'));
    });

  });

  