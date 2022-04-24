import React, { Component, createRef, useRef } from "react";
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
class Console extends Component {
  constructor(props) {
    super(props);
    this.terminalEl = createRef();
    this.terminalOption = {
      cursorStyle: "bar",
      fontFamily: "courier",
    };
  }

  openWebSocket() {
    const socket = new WebSocket("ws://localhost:65432");
    return socket;
  }

  openTerminal(targetElement, socket) {
    const terminal = new Terminal(this.terminalOption);
    const attachAddon = new AttachAddon(socket);
    const fitAddon = new FitAddon();
    terminal.loadAddon(attachAddon);
    terminal.loadAddon(fitAddon);
    terminal.open(targetElement);
    fitAddon.fit();
    // socket.onopen = () => terminal.writeln("\r");
    return terminal;
  }

  writeInitMessage(terminal) {
    terminal.writeln("     __         __     __  __    ");
    terminal.writeln("    / /   ___  / /_   / / / /____");
    terminal.writeln("   / /   / _ \\/ __/  / / / / ___/");
    terminal.writeln("  / /___/  __/ /_   / /_/ (__  ) ");
    terminal.writeln(" /_____/\\___/\\__/   \\____/____/  ");
    terminal.writeln(" ");
    terminal.writeln("| Online IDE for code:us");
    terminal.writeln(" ");
    terminal.writeln("| Powered By Xterm.js");
    terminal.writeln(" ");
    terminal.writeln("| 진행을 원하시면 ENTER를 누르세요");
    terminal.writeln(" ");
  }

  componentDidMount() {
    const socket = this.openWebSocket();
    const terminal = this.openTerminal(this.terminalEl.current, socket);
    this.writeInitMessage(terminal);
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  render() {
    return (
      <div id="terminal-container">
        <div id="terminal" ref={this.terminalEl}></div>
      </div>
    );
  }
}

export default Console;
