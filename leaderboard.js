let nameToColor = new Map()

class Leaderboard {
  constructor(ordered_times, time_to_scores) {
    this.ordered_times = ordered_times
    this.time_to_scores = time_to_scores
  }

  lastNGames(time, n) {
    var lastIdx = 0
    var timeStr = formatTime(time)
    for (let i = 0; i < this.ordered_times.length; i++) {
      if (timeStr < this.ordered_times[i]) {
        break
      }
      lastIdx = i
    }
    let result = []
    for (let i = Math.max(0, lastIdx - n + 1); i <= lastIdx; i++) {
      result.push(this.ordered_times[i])
    }
    return result
  }

  namesIn(timeStrs) {
    let names = new Set()
    timeStrs.forEach((time) => {
      this.time_to_scores.get(time).forEach((_, name) => {
        names.add(name)
      });
    });
    return Array.from(names.keys());
  }

  scoresAt(timeStr) {
    return this.time_to_scores.get(timeStr)
  }
}

class Row {
  constructor(name) {
    this.name = name
    this.times = []
    this.time_to_score = new Map()
    if (!nameToColor.has(this.name)) {
      nameToColor.set(this.name, getRandomColor())
    }
    this.color = nameToColor.get(this.name)
  }

  addScore(time, score) {
    this.times.push(time)
    if (score != undefined) {
      this.time_to_score.set(time, score)
    }
  }

  scoreAt(time) {
    return this.time_to_score.get(time)
  }

  get dataset() {
    var data = []
    this.times.forEach((time) => {
      data.push(this.scoreAt(time))
    });

    let color = getRandomColor()

    return {
      label: this.name,
      backgroundColor: this.color,
      borderColor: this.color,
      data: data,
      fill: false,
      hoverRadius: 5,
      hoverBorderColor: this.color,
      hoverBorderWidth: 10,
    }
  }

  get total() {
    var t = 0
    this.time_to_score.forEach((n) => {
      t += n
    });
    return t
  }

  get nGames() {
    return this.time_to_score.size
  }

  get average() {
    return this.total / this.nGames
  }

  get html() {
    return `<tr><td>${this.name}</td><td class="text-right">${this.average.toFixed(3)}</td><td class="text-right">${this.nGames}</td></tr>`
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function fancifyTimeStr(timeStr) {
  return moment(timeStr, 'YYYY-MM-DD_HHmm').format('MM/DD/YYYY HH:mm')
}

function momentInit() {
  moment.tz.add("America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6")
  return "America/New_York"
}

function formatTime(time) {
  return time.format('YYYY-MM-DD_HHmm')
}

function parseTime(timeStr) {
  return moment(timeStr, 'YYYY-MM-DD_HHmm')
}

function getParam(key, default_value) {
  var url = new URL(window.location.href);
  var param = url.searchParams.get(key);
  if (param == null) {
    return default_value
  }
  return param
}

function updatePage(game, time, leaderboard, nGames) {
  times = leaderboard.lastNGames(time, nGames)
  $("#game").text(`${game}`)
  $("#nGames").text(`Last ${times.length} competitions`)

  names = leaderboard.namesIn(times)
  name_to_row = new Map()
  names.forEach((name) => {
    name_to_row.set(name, new Row(name))
  });
  times.forEach((time) => {
    scores = leaderboard.scoresAt(time)
    names.forEach((name) => {
      row = name_to_row.get(name)
      row.addScore(time, scores.get(name))
    });
  });
  rows = Array.from(name_to_row.values())
  // rows = rows.filter((row) => {
  //   return row.nGames > times.length / 2
  // })
  rows.sort(function(r1, r2) {
    if (r1.average >= r2.average) {
      return -1
    } else {
      return 1
    }
  })
  nameToIdx = new Map()
  rows.forEach((row, i) => {
    nameToIdx.set(row.name, i)
    $("#leaderboard").append(row.html)
  });
  chart(times, rows, nameToIdx)

}

function chart(times, rows, nameToIdx) {
  canvas = $("#chart")[0]
  ctx = canvas.getContext('2d');
  canvas.width = $("#chart_col").width();
  canvas.height = $("#chart_col").height();
  ctx.width = canvas.width
  ctx.height = canvas.height
  var datasets = []
  rows.forEach((row) => {
    datasets.push(row.dataset)
  });

  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: times.map(fancifyTimeStr),
      datasets: datasets
    },
    options: {
      responsive: true,
      legend: {
        position: 'right',
      },
      tooltips: {
        mode: 'dataset',
        intersect: true,
        filter: function(item) {
          return isFinite(parseFloat(item.value))
        },
        callbacks: {
          title: function(items, data) {
            var name = data.datasets[items[0].datasetIndex].label
            var place = nameToIdx.get(name) + 1
            var score = rows[nameToIdx.get(name)].average
            return `#${place} ${name} (${score.toFixed(3)})`
          },
          label: function(item, data) {
            return item.label + " :: " + item.value
          }
        }
      },
      hover: {
        mode: 'dataset',
        intersect: true,
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Game'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Score'
          }
        }]
      },
      title: {
        display: true,
        text: `Scores over last ${times.length} games`
      }
    }
  });
}

$(document).ready(function() {
  TZ = momentInit();
  var NOW = moment().tz(TZ);

  game = getParam("game", null)
  if (game == null) {
    console.log("null game, exiting");
    return
  }
  if (!(/^\w+$/).test(game)) {
    console.log("illegal character in game, exiting")
    return
  }

  $.ajax({
    url: encodeURI(`boards/${game}.txt`),
    success: function(data) {
      ordered_times = []
      time_to_scores = new Map()
      all_leaderboards = data.split("\n")
      all_leaderboards.forEach((item, i) => {
        if (item.length == 0) {
          return
        }
        words = item.split("\t")
        time = words[0]
        scores = new Map()
        valid = false
        for (let j = 1; j < words.length; j += 2) {
          x = parseFloat(words[j + 1])
          scores.set(words[j], x)
          if (x != 0) {
            valid = true
          }
        }
        if (valid) {
          ordered_times.push(time)
          time_to_scores.set(time, scores)
        }
      });

      board = new Leaderboard(ordered_times, time_to_scores)
      updatePage(game, NOW, board, 24)
    },
    error: function(e) {
      console.log(`Leaderboard for game '${game}' not found.`)
      console.log(e)
    }
  });
})
