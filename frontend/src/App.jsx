import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="/login" element={<h1>Login</h1>} />
				<Route path="*" element={<h1>Page Not Found</h1>} />
			</Routes>
		</>
	);
}

export default App;
