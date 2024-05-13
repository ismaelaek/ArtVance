import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<div className=" min-h-screen bg-gray-200">
			<App />
		</div>
	</BrowserRouter>
);
