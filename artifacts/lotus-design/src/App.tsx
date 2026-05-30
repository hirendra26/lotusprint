import { Route, Switch } from "wouter";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/payment" component={Payment} />
        <Route path="/contact" component={Contact} />
        <Route>
          <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-6xl font-black mb-4">404</h1>
            <p className="text-white/50 text-xl mb-8">Page not found</p>
            <a href="/" className="h-12 px-8 rounded-full bg-[#E91E8C] text-white font-semibold flex items-center hover:bg-[#c9166e] transition-all">
              Go Home
            </a>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}
