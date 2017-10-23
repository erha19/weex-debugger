
var timeline = new Timeline();
var localNativeTracingData = [];
var localSummaryInfo = {};

var saveDataBtn = document.getElementById('save-data-btn');
var loadDataBtn = document.getElementById('load-data-btn');
var fileInput = document.getElementById('fileInput');

saveDataBtn.addEventListener('click', saveJsonDataToLocal);
loadDataBtn.addEventListener('click', handleClickLoadDataBtn);
fileInput.addEventListener('change', loadJsonDatafromLocal);

var dataAnalyseNav = document.querySelector('.data-analyse-tabnav');
for (var i = 0, len = dataAnalyseNav.children.length; i < len; i++) {
  dataAnalyseNav.children[i].addEventListener('click', switchDataAnalyseContent);
}

function refreshProphetPage(nativeTracingData) {
  localNativeTracingData = copyNativeTracingData(nativeTracingData);
  var tracingData = preprocessTracingData(nativeTracingData);

  clearTimelineTip();

  timeline.setTracingData(tracingData);
  refreshSummaryPanel(tracingData);
}

function refreshProphetPageFromLocal(localData) {
  var tracingData = localData.tracingData || [];
  var summaryInfo = localData.summaryInfo || {};
  refreshProphetPage(tracingData);
  setSummaryInfo(summaryInfo);
}

function setSummaryInfo(summaryInfo) {
  localSummaryInfo = summaryInfo;
  var newSummaryInfo = preprocessSummaryInfo(summaryInfo);
  refreshSummaryInfo(newSummaryInfo);
}

function refreshSummaryPanel(tracingData) {
  refreshSummaryPieChart(tracingData);
}

var timeSummaryData = [];
var Stat = G2.Stat;
var summaryPieChart = new G2.Chart({
  id: 'summary-pie-chart',
  forceFit: true,
  width: 400,
  height: 190
});
summaryPieChart.source([]);
summaryPieChart.coord('theta', {
  radius: 0.6 // 设置饼图的大小
});
summaryPieChart.legend('name', {
  position: 'bottom',
  itemWrap: true,
  formatter: function(val) {
    for(var i = 0, len = timeSummaryData.length; i < len; i++) {
      var obj = timeSummaryData[i];
      if (obj.name === val) {
        return val + ' - ' + obj.value.toFixed(2) + 'ms'; 
      }
    }
  }
});
summaryPieChart.tooltip({
  title: null
});
summaryPieChart.intervalStack()
  .position(Stat.summary.percent('value'))
  .color('name')
summaryPieChart.render();

function refreshSummaryPieChart(tracingData) {
  timeSummaryData = [];
  tracingData.timePoint.forEach((item) => {
    timeSummaryData.push({
      name: item.name,
      value: item.totalTime
    })
  });

  summaryPieChart.changeData(timeSummaryData);

  var geom = summaryPieChart.getGeoms()[0]; // 获取所有的图形
  var items = geom.getData(); // 获取图形对应的数据
  geom.setSelected(items[2]); // 设置选中
}

function refreshSummaryInfo(summaryInfo) {
  var globalInfo = summaryInfo.globalInfo;
  var warningInfo = summaryInfo.warningInfo;
  var summaryGlobalInfo = document.getElementById('summary-global-info');
  var htmlText = '';
  htmlText += '<div class="info-name">';
  globalInfo.forEach((item) => {
    htmlText += '<p>' + item.name + ': </p>';
  });
  htmlText += '</div>';

  htmlText += '<div class="info-content">';
  globalInfo.forEach((item) => {
    htmlText += '<p>' + item.content + '</p>';
  });
  htmlText += '</div>';
  summaryGlobalInfo.innerHTML = htmlText;

  var summaryWarningInfo = document.getElementById('summary-warning-info');
  htmlText = '';
  htmlText += '<div class="info-name">';
  warningInfo.forEach((item) => {
    htmlText += '<p>' + item.name + ': </p>';
  });
  htmlText += '</div>';

  htmlText += '<div class="info-content">';
  warningInfo.forEach((item) => {
    htmlText += '<p>' + item.content + '</p>';
  });
  htmlText += '</div>';
  summaryWarningInfo.innerHTML = htmlText;
}

function saveJsonDataToLocal() {
  var localJson = {
    tracingData: localNativeTracingData,
    summaryInfo: localSummaryInfo
  };
  var blob = new Blob([JSON.stringify(localJson, null, 2)], { type: 'application/json' });
  var link = document.createElement('a');
  link.download = "Prophet" + Date.now() + ".json";
  link.href = URL.createObjectURL(blob);
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(event);
}

function handleClickLoadDataBtn() {
  fileInput.click();
}

function loadJsonDatafromLocal() {
  var file = fileInput.files[0];
  var fileType = /application\/json/;

  if (file && file.type.match(fileType)) {
    var reader = new FileReader();

    reader.onload = function(ev) {
      try {
        var localData = JSON.parse(ev.target.result);
        refreshProphetPageFromLocal(localData);
      } catch (e) {
        
      }
    }

    reader.readAsText(file);
  }
}

function copyNativeTracingData(nativeTracingData) {
  var to = [];
  nativeTracingData.forEach((item) => {
    var tmpObj = {};
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        tmpObj[key] = item[key];
      }
    }
    to.push(tmpObj);
  })
  return to;
}

function switchDataAnalyseContent(event) {
  var target = event.target;
  var dataAnalyseContent = document.querySelector('.data-analyse-content');
  for (var i = 0, len = dataAnalyseNav.children.length; i < len; i++) {
    var dataAnalyseContentChild = dataAnalyseContent.children[i];
    var dataAnalyseNavChild = dataAnalyseNav.children[i];

    if (target === dataAnalyseNav.children[i]) {
      dataAnalyseNavChild.classList.add('data-analyse-tab-item-active');
      dataAnalyseContentChild.style.display = 'block';
    } else {
      dataAnalyseNavChild.classList.remove('data-analyse-tab-item-active');
      dataAnalyseContentChild.style.display = 'none';
    }
  }
}

function clearTimelineTip() {
  var tip = document.getElementById('timeline-tip');
  tip.style.display = "none";
}