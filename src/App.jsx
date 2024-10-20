import { Routes, Route } from "react-router-dom";
export default function App() {
  return <div>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
  </div>;
}
