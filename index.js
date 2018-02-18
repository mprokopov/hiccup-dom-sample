import { serialize } from "@thi.ng/hiccup";
import { start } from "@thi.ng/hiccup-dom";

// stateless component w/ params
const greeter = (name) => ["h1.title", "hello ", name];

const greeter2 = (data) => ["h2", "hello, ", data, "!"]

// component w/ local state
const counter = () => {
    let i = 0;
    return () => ["button", { onclick: () => (i++) }, `clicks: ${i}`];
};

const app = () => {
    // instantiation
  const counters = [counter(), counter()];
    // root component is just a static array
  return ["div#app", [greeter, "world"], [greeter2, "Nexus"], ...counters];
};

// browser only (see diagram below)
start(document.body, app());

// browser or server side serialization
// (note: does not emit event attributes w/ functions as values)
serialize(app);
// <div id="app"><h1 class="title">hello world</h1><button>clicks: 0</button><button>clicks: 0</button></div>

console.log("hello world");
