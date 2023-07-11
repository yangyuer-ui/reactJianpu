var App, exampleSongs, parse, rowyourboat, susanna,
  modulo = function (a, b) { return (+a % (b = +b) + b) % b; };

parse = function (m) {
  var base, deli, handleLastline, i, isNum, j, k, l, lastLine, len, len1, len2, line, lines, lyricsDelims, noteDelims, notes, o, ref, ref1, ref2, ref3;
  notes = [];
  base = c4;
  lines = m.split("\n");
  isNum = {};
  ref = [0, 1, 2, 3, 4, 5, 6, 7];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    isNum[i] = true;
  }
  noteDelims = {};
  ref1 = ["<", ">", "#", "b"];
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    deli = ref1[k];
    noteDelims[deli] = true;
  }
  lyricsDelims = {};
  ref2 = [",", ".", ";", "?", "!", "(", ")", " ", void 0];
  for (l = 0, len2 = ref2.length; l < len2; l++) {
    deli = ref2[l];
    lyricsDelims[deli] = true;
  }
  handleLastline = function (line) {
    var accidental, c, control, controlLine, duration, extraDuration, lastLyricsChar, len3, lyrics, lyricsChar, lyricsLine, main, o, options, pitch, results, tempo, tempoLine;
    tempoLine = line.tempoLine, controlLine = line.controlLine, lyricsLine = line.lyricsLine, main = line.main;
    pitch = null;
    extraDuration = 0;
    options = {};
    accidental = 0;
    lyrics = {};
    lastLyricsChar = void 0;
    results = [];
    for (i = o = 0, len3 = main.length; o < len3; i = ++o) {
      c = main[i];
      if (i === main.length - 1 || pitch !== null && (isNum[c] || noteDelims[c])) {
        if (lyrics.exists) {
          if (i === main.length - 1) {
            lyrics.content += lyricsLine.substr(i);
          }
          lyrics.content.trim();
        }
        notes.push({
          pitch: {
            base: pitch,
            accidental: accidental
          },
          duration: duration + extraDuration,
          options: options,
          lyrics: lyrics
        });
        options = {};
        pitch = null;
        duration = null;
        extraDuration = 0;
        accidental = 0;
        lyrics = {};
      }
      tempo = tempoLine != null ? tempoLine[i] : void 0;
      control = controlLine != null ? controlLine[i] : void 0;
      lyricsChar = lyricsLine != null ? lyricsLine[i] : void 0;
      switch (c) {
        case "0":
          pitch = rest;
          break;
        case "1":
          pitch = base;
          break;
        case "2":
          pitch = base + 2;
          break;
        case "3":
          pitch = base + 4;
          break;
        case "4":
          pitch = base + 5;
          break;
        case "5":
          pitch = base + 7;
          break;
        case "6":
          pitch = base + 9;
          break;
        case "7":
          pitch = base + 11;
          break;
        case "<":
          base += 12;
          break;
        case ">":
          base -= 12;
          break;
        case "-":
          extraDuration += 8;
          break;
        case ".":
          extraDuration += duration / 2;
          break;
        case "#":
          accidental = 1;
          break;
        case "b":
          accidental = -1;
      }
      switch (control) {
        case "S":
          options.slur = "start";
          break;
        case "s":
          options.slur = "end";
      }
      if (isNum[c]) {
        duration = (function () {
          switch (tempo) {
            case "#":
              return 1;
            case "-":
              return 4;
            case "=":
              return 2;
            default:
              return 8;
          }
        })();
      }
      if ((lyricsChar != null) && !(isNum[c] && lyricsDelims[lyricsChar])) {
        if (lyrics.exists) {
          lyrics.content += lyricsChar;
        } else if (lyricsChar !== " ") {
          lyrics.exists = true;
          lyrics.content = lyricsChar;
          lyrics.hyphen = !(lastLyricsChar in lyricsDelims);
        }
      }
      results.push(lastLyricsChar = lyricsChar);
    }
    return results;
  };
  lastLine = {};
  for (i = o = 0, ref3 = lines.length; o < ref3; i = o += 1) {
    line = lines[i];
    if (line[0] === "T") {
      lastLine.tempoLine = line.slice(1);
    } else if (line[0] === "C") {
      lastLine.controlLine = line.slice(1);
    } else if (line[0] === "L") {
      lastLine.lyricsLine = line.slice(1);
    } else if (line[0] === "M") {
      if (lastLine.main) {
        handleLastline(lastLine);
        lastLine = {};
      }
      lastLine.main = line.slice(1);
    }
  }
  if (lastLine.main) {
    handleLastline(lastLine);
  }
  return notes;
};

({
  controlSyms: {
    "S": "slur start",
    "s": "slur end"
  }
});
// 获取ip
function getIp() {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', `http://www.suihanmusic.com:5001`, true)
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        sessionStorage.setItem('ipPath', JSON.parse(xhr.response).ip);
      }
    }
  }
}


rowyourboat = "M1.   1.|  1   2    3.|   3  2   3    4|  5--|\nT              -             -        -\nLRow, row, row your boat, gently down the stream.\nM<1.>5.| 3.     1.| 5   4 3  2|1--|\nT                       -    -\nC                   S   s \nL Ha ha, fooled ya, I'm a submarine.";

susanna = "M00001  2|3    5    5.6 5 3  1.   2  3  3  2  1  2     1   2|\nT   -=  = =    =    = # = =  =    #  =  =  =  =  -     =   =\nL    Oh I come from A labama with my banjo on my knee. And I'm\nC       S s                                                S\nM3    5   5.  6 531. 2  3    3    2   2  1|\nT=    =   =   # ===  #  =    =    =   =  \nLgoin' to Louisia na My true love for to see.\nCs              Ss";

exampleSongs = [
  {
    name: "Row your boat",
    markup: rowyourboat,
    melody: parse(rowyourboat),
    time: {
      upper: 3,
      lower: 4
    },
    key: {
      left: "1",
      right: "C"
    }
  }, {
    name: "Oh Susanna",
    markup: susanna,
    melody: parse(susanna),
    time: {
      upper: 4,
      lower: 4
    },
    key: {
      left: "1",
      right: "C"
    }
  }
];

App = React.createClass({
  displayName: "App",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      alignSections: true,
      markup: exampleSongs[0].markup,
      json: JSON.stringify(exampleSongs[0].melody, null, 2),
      rawTime: "3/4",
      rawKey: "1=C",
      sectionsPerLine: 4,
      song: exampleSongs[0],
      isPlaying: null,
      volume: 30,
      bpm: 120,
      instrument: "piano",
      useMarkup: true,
      songName: "",//歌曲名称
      songLyrics: '',//歌曲主题
      songSetValue: '',//歌词设置
    };
  },
  playNotes: function (notes) {
    var i, playHelper;
    i = 0;
    playHelper = (function (_this) {
      return function () {
        var base, bpm, crotchetDuration, diff, duration, instrument, m, n, nOctaves, note, noteStr, number, pitch, ref, song, unitPitch;
        if (i >= notes.length || _this.shouldStop) {
          _this.shouldStop = false;
          return _this.setState({
            isPlaying: null
          });
        } else {
          note = notes[i];
          pitch = note.pitch, duration = note.duration;
          _this.setState({
            isPlaying: note
          });
          ref = _this.state, bpm = ref.bpm, instrument = ref.instrument, song = ref.song;
          crotchetDuration = 60 / bpm;
          if (pitch.base > 0) {
            m = song.key.right.match(/(#|b)?([A-G])/);
            if (m[1] === "#") {
              base = 1;
            } else if (m[1] === "b") {
              base = -1;
            } else {
              base = 0;
            }
            number = (m[2].charCodeAt(0) - 60) % 7 + 1;
            base += numberMap[number];
            diff = base + pitch.base + pitch.accidental - c4;
            unitPitch = modulo(diff, 12);
            n = notesMap[unitPitch];
            noteStr = String.fromCharCode(65 + (n.number + 1) % 7);
            if (n.accidental === 1) {
              noteStr += "#";
            }
            nOctaves = Math.floor(diff / 12) + 4;
            Synth.play(instrument, noteStr, nOctaves, duration / 8 * crotchetDuration);
          }
          setTimeout(playHelper, duration / 8 * crotchetDuration * 1000);
          return i++;
        }
      };
    })(this);
    return playHelper();
  },
  shouldStop: false,
  stopPlaying: function () {
    return this.shouldStop = true;
  },
  onClick: function (e) {
    var json, markup, melody, ref, song, useMarkup;
    ref = this.state, song = ref.song, markup = ref.markup, useMarkup = ref.useMarkup, json = ref.json;
    if (useMarkup) {
      melody = parse(markup);
    } else {
      melody = JSON.parse(json);
    }
    song.melody = melody;
    return this.setState({
      song: song
    });
  },
  onChangeAlign: function (e) {
    return this.setState({
      alignSections: e.target.checked
    });
  },
  onChangeKey: function (e) {
    var key, rawKey;
    rawKey = e.target.value;
    this.setState({
      rawKey: rawKey
    });
    if (key = this.parseKey(rawKey)) {
      this.state.song.key = key;
      return this.setState({
        song: this.state.song
      });
    }
  },
  parseKey: function (key) {
    var m;
    m = key.match(/^([1-7])=((?:#|b)?[A-G])$/);
    if (m != null) {
      return {
        left: m[1],
        right: m[2]
      };
    } else {
      return null;
    }
  },
  onChangeTime: function (e) {
    var rawTime, time;
    rawTime = e.target.value;
    this.setState({
      rawTime: rawTime
    });
    time = this.parseRowTime(rawTime);
    if (time.upper > 0 && time.lower > 0) {
      this.state.song.time = time;
      return this.setState({
        song: this.state.song
      });
    }
  },
  parseRowTime: function (rawTime) {
    var iSplit;
    iSplit = rawTime.indexOf("/");
    return {
      upper: parseInt(rawTime.substr(0, iSplit)),
      lower: parseInt(rawTime.substr(iSplit + 1))
    };
  },
  validateTime: function (rawTime) {
    var lower, ref, upper;
    ref = this.parseRowTime(rawTime), upper = ref.upper, lower = ref.lower;
    if ((upper + "/" + lower) === rawTime) {
      return {
        upper: upper,
        lower: lower
      };
    } else {
      return null;
    }
  },
  onChangeSPL: function (e) {
    return this.setState({
      sectionsPerLine: parseInt(e.target.value)
    });
  },
  onChangeVolume: function (v) {
    Synth.setVolume(v / 100);
    return this.setState({
      volume: v
    });
  },
  onChangeBPM: function (e) {
    return this.setState({
      bpm: parseInt(e.target.value)
    });
  },
  instruments: ["piano", "organ", "acoustic", "edm"],
  onSelectInstrument: function (eventKey) {
    return this.setState({
      instrument: eventKey
    });
  },
  onClickInstrument: function (e) {
    var bpm, crotchetDuration, instrument, ref, volume;
    ref = this.state, volume = ref.volume, bpm = ref.bpm, instrument = ref.instrument;
    crotchetDuration = 60 / bpm;
    Synth.setVolume(volume / 100);
    return Synth.play(instrument, "C", 4, crotchetDuration * 2);
  },
  selectSong: function (eventKey) {
    return this.setState({
      song: exampleSongs[eventKey],
      markup: exampleSongs[eventKey].markup,
      json: JSON.stringify(exampleSongs[eventKey].melody, null, 2)
    });
  },
  changeMarkup: function (e) {
    return this.setState({
      markup: e.target.value
    });
  },
  changeJSON: function (e) {
    return this.setState({
      json: e.target.value
    });
  },
  toggleInputFormat: function () {
    if (this.state.useMarkup) {
      this.setState({
        json: JSON.stringify(parse(this.state.markup), null, 2)
      });
    }
    return this.setState({
      useMarkup: !this.state.useMarkup
    });
  },
  onChangeLyric: function (e) {
    var songLyrics;
    songLyrics = e.target.value;
    this.setState({
      songLyrics: songLyrics
    });
  },
  onChangeSetSong: function (e) {
    this.setState({
      songSetValue: e.target.value
    });
  },
  // 作词
  btnChangeLyric: function () {
    let that = this;
    let baseUrl = sessionStorage.getItem('ipPath');
    let xhr = new XMLHttpRequest()
    xhr.open('POST', `http://${baseUrl}:16005`)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(window.Qs.stringify({
      text: this.state.songLyrics,
      classification: "lyric",//不允许更改
      num_sentences: "100"//返回100句
    }))
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.response);
          that.setState({
            songSetValue: res.generated_text.join('\n')
          });
        }
      }
    }
  },
  // 作曲
  btnChangeSong: function () {
    let that = this;
    let baseUrl = sessionStorage.getItem('ipPath');
    let xhr = new XMLHttpRequest()
    xhr.open('POST', `http://${baseUrl}:16006/index`)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(window.Qs.stringify({
      lyric: JSON.stringify(this.state.songSetValue.split('\n')),
      returnFormat: 'json'
    }))
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.response);
          that.setState({
            songSetValue: res.generated_text.join('\n')
          });
        }
      }
    }
  },
  render: function () {
    var alignSections, bpm, brand, exampleSong, i, instr, instrument, isPlaying, json, markup, rawKey, rawTime, ref,
      sectionsPerLine, song, useMarkup, volume, songName, songLyrics, songSetValue;
    ref = this.state,
      song = ref.song,
      markup = ref.markup,
      json = ref.json,
      useMarkup = ref.useMarkup,
      alignSections = ref.alignSections,
      rawTime = ref.rawTime,
      sectionsPerLine = ref.sectionsPerLine,
      isPlaying = ref.isPlaying,
      volume = ref.volume,
      bpm = ref.bpm,
      instrument = ref.instrument,
      rawKey = ref.rawKey,
      songName = ref.songName,
      songLyrics = ref.songLyrics,
      songSetValue = ref.songSetValue;
    return <div>
      <div className="md-set form-group row">
        <span>歌曲名</span><input type="text" className="form-control" value={songName}></input>
        <span>歌曲主题</span><input type="text" className="form-control" placeholder="请输入歌曲主题" value={songLyrics}
          onChang={this.onChangeLyric}
        ></input>
        <button type="button" className="btn btn-outline-primary" onClick={this.btnChangeLyric}>作词</button>
        <button type="button" className="btn btn-outline-primary" onClick={this.btnChangeSong}>作曲</button>
        <button type="button" className="btn btn-outline-primary">AI人声</button>
        <button type="button" className="btn btn-outline-primary">AI伴奏</button>
        <button type="button" className="btn btn-outline-primary" onClick={this.onClick}>刷新</button>
        <button type="button" className="btn btn-outline-primary">播放</button>
      </div>
      <Grid fluid="true">
        <Col md="7">
          <div className="mark-set">
            <DropdownButton onSelect={this.selectSong} title={song.name}>
              {exampleSongs.map((value, index) => {
                return (
                  <MenuItem key={index} eventKey={index}> {value.name}
                  </MenuItem>
                )
              })}
            </DropdownButton>
            <div>
              <input type="checkbox" label="JSON" onChange={this.toggleInputFormat}
                checked={!useMarkup} /></div>
          </div>
          {
            useMarkup ? <Input type="textarea" groupClassName="markup-input" rows='10' label="Markup" onChange={this.changeMarkup} value={markup} />
              : <Input type="textarea" groupClassName="markup-input" rows='10' label="Markup" onChange={this.changeJSON} value={json} />
          }
        </Col>
        <Col md="5">
          <PanelGroup defaultActiveKey="1" accordion={true} >
            <Panel header="歌词配置,修改歌词用enter换行隔开" eventKey="1">
              <Input type="textarea" placeholder="歌词" rows='10' label="Markup"
                onChange={this.onChangeSetSong} value={songSetValue}
                bsStyle={(this.parseKey(rawKey) == null ? "error" : void 0)}
              />
            </Panel>
            <Panel header="普通设置" eventKey="2">
              <Input type="text" placeholder="1=C" label="Key"
                onChange={this.onChangeKey} value={rawKey}
                bsStyle={(this.parseKey(rawKey) == null ? "error" : void 0)}
              />
              <Input type="text" placeholder="Time" label="Time"
                onChange={this.onChangeTime} value={rawTime}
                bsStyle={(!this.validateTime(rawTime) ? "error" : void 0)}
              />
              <Input type="checkbox" label="Align Sections"
                onChange={this.onChangeAlign} checked={alignSections}
              />
              <Input type="number" label="Sections per line" placeholder="4"
                value={sectionsPerLine} onChange={this.onChangeSPL}
              />
            </Panel>
            <Panel header="播放设置" eventKey="3">
              <div className="form-group">
                <label className="control-label">Volume</label>
                <Slider min={0}
                  max={100}
                  step={1}
                  value={volume}
                  onSlide={this.onChangeVolume}
                  toolTip={true}
                  formatter={(function (v) {
                    return v + "%";
                  })}
                />
                <Input type="number" label="BPM" placeholder="120"
                  value={bpm} onChange={this.onChangeBPM}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Instrument</label>
                <SplitButton
                  title="instrument"
                  onSelect={this.onSelectInstrument}
                  onClick={this.onClickInstrument}
                >
                  {this.instruments.map((value, index) => {
                    return (
                      <MenuItem key={index} eventKey={index}> {value}
                      </MenuItem>
                    )
                  })}
                </SplitButton>
              </div>
            </Panel>
          </PanelGroup>
        </Col>
      </Grid>
      <Panel header="预览" >
        <Jianpu
          song={song}
          sectionsPerLine={sectionsPerLine}
          alignSections={alignSections}
          highlight={isPlaying}
        ></Jianpu>
      </Panel>
    </div>
    React.createElement("div", {},),
      React.createElement("div", null,
        React.createElement('div', {
          "className": "md-set",
        },
          React.createElement(Input, {
            "type": "text",
            "label": "歌曲名",
            "value": songName,
            "placeholder": "请输入歌曲名",
          }),
          React.createElement(Input, {
            "type": "text",
            "label": "歌曲主题",
            "value": songLyrics,
            "onChange": this.onChangeLyric,
            "placeholder": "请输入歌曲主题",
          }), React.createElement('button', {
            "className": "btn-col",
            "onClick": this.btnChangeLyric
          }, "作词"), React.createElement('button', {
            "className": "btn-col",
            "onClick": this.btnChangeSong
          }, "作曲"),
          React.createElement('button', {
            "href": "#",
            "className": "btn-col",
            "onClick": this.onClick
          }, "刷新"),
          (isPlaying ? React.createElement('button', {
            "href": "#",
            "className": "btn-col",
            "onClick": this.stopPlaying
          }, "暂停") :
            React.createElement('button', {
              "href": "#",
              "className": "btn-col",
              "onClick": this.playNotes.bind(this, song.melody)
            }, "播放")),
        ),

        React.createElement(Grid, {
          "fluid": true
        },
          React.createElement(Row, null, React.createElement(Col, {
            "md": 7,
          },
            React.createElement('div', {
              className: 'mark-set',
            }, React.createElement(DropdownButton, {
              "title": song.name,
              "onSelect": this.selectSong
            }, (function () {
              var j, len, results;
              results = [];
              for (i = j = 0, len = exampleSongs.length; j < len; i = ++j) {
                exampleSong = exampleSongs[i];
                results.push(React.createElement(MenuItem, {
                  "key": i,
                  "eventKey": i
                }, exampleSong.name));
              }
              return results;
            })()), React.createElement(Input, {
              "type": "checkbox",
              "label": "JSON",
              "onChange": this.toggleInputFormat,
              "checked": !useMarkup
            }),),
            (useMarkup ? React.createElement(Input, {
              "groupClassName": "markup-input",
              "type": "textarea",
              "label": "Markup",
              "onChange": this.changeMarkup,
              "value": markup,
              "rows": 10
            }) : React.createElement(Input, {
              "groupClassName": "markup-input",
              "type": "textarea",
              "label": "JSON",
              "onChange": this.changeJSON,
              "value": json,
              "rows": 10
            }))), React.createElement(Col, {
              "md": 5
            }, React.createElement(PanelGroup, {
              "defaultActiveKey": "1",
              "accordion": true
            },
              React.createElement(Panel, {
                "header": "歌词配置,修改歌词用enter换行隔开",
                "eventKey": "1"
              }, React.createElement(Input, {
                "type": "textarea",
                "label": "",
                "placeholder": "歌词",
                "rows": 10,
                "value": songSetValue,
                "onChange": this.onChangeSetSong,
                "bsStyle": (this.parseKey(rawKey) == null ? "error" : void 0)
              })),
              React.createElement(Panel, {
                "header": "普通设置",
                "eventKey": "2"
              }, React.createElement(Input, {
                "type": "text",
                "label": "Key",
                "placeholder": "1=C",
                "value": rawKey,
                "onChange": this.onChangeKey,
                "bsStyle": (this.parseKey(rawKey) == null ? "error" : void 0)
              }), React.createElement(Input, {
                "type": "text",
                "label": "Time",
                "placeholder": "4/4",
                "value": rawTime,
                "onChange": this.onChangeTime,
                "bsStyle": (!this.validateTime(rawTime) ? "error" : void 0)
              }), React.createElement(Input, {
                "type": "checkbox",
                "label": "Align Sections",
                "onChange": this.onChangeAlign,
                "checked": alignSections
              }), React.createElement(Input, {
                "type": "number",
                "label": "Sections per line",
                "placeholder": "4",
                "value": sectionsPerLine,
                "onChange": this.onChangeSPL
              })),
              React.createElement(Panel, {
                "header": "播放设置",
                "eventKey": "3"
              }, React.createElement("div", {
                "className": "form-group"
              },
                React.createElement("label", {
                  "className": "control-label"
                }, "Volume"), React.createElement(Slider, {
                  "min": 0,
                  "max": 100,
                  "step": 1,
                  "value": volume,
                  "onSlide": this.onChangeVolume,
                  "toolTip": true,
                  "formatter": (function (v) {
                    return v + "%";
                  })
                })), React.createElement(Input, {
                  "type": "number",
                  "label": "BPM",
                  "placeholder": "120",
                  "value": bpm,
                  "onChange": this.onChangeBPM
                }), React.createElement("div", {
                  "className": "form-group"
                }, React.createElement("label", {
                  "className": "control-label"
                }, "Instrument"), React.createElement(SplitButton, {
                  "title": instrument,
                  "onSelect": this.onSelectInstrument,
                  "onClick": this.onClickInstrument
                }, (function () {
                  var j, len, ref1, results;
                  ref1 = this.instruments;
                  results = [];
                  for (j = 0, len = ref1.length; j < len; j++) {
                    instr = ref1[j];
                    results.push(React.createElement(MenuItem, {
                      "key": instr,
                      "eventKey": instr
                    }, instr));
                  }
                  return results;
                }).call(this)))))))),

        React.createElement(Panel, {
          "header": "Preview"
        }, React.createElement(Jianpu, {
          "song": song,
          "sectionsPerLine": sectionsPerLine,
          "alignSections": alignSections,
          "highlight": isPlaying
        })));

  }
});

// React.render(React.createElement(App, null), document.getElementById("mycontainer"));
React.render(<App name="app" />, document.getElementById("mycontainer"));
getIp();