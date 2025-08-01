// "use strict";

import React from "react";

// // Unused variable (linting error)
// const unusedVar = "This will trigger a warning";

// // Missing return type (linting error)
// export default function TestPage() {
// 	// Inconsistent quotes (formatting error - Biome prefers double quotes as per your config)
// 	const singleQuotes =
// 		"This should use double quotes according to your Biome config";

// 	// Unnecessary semicolon (formatting error)
// 	const extraSemicolon = "Extra semicolon";

// 	// Unreachable code (linting error)
// 	if (true) {
// 		return <div>Test Page</div>;
// 		console.log("This will never execute");
// 	}

// 	// Unused function (linting error)
// 	function unusedFunction() {
// 		return "This function is never called";
// 	}

// 	// Missing key in array elements (React linting error)
// 	const items = ["item1", "item2", "item3"];

// 	return (
// 		<div>
// 			<h1>Test Page with Biome Errors</h1>
// 			{/* Missing key prop in list rendering */}
// 			{items.map((item) => (
// 				<div>{item}</div>
// 			))}
// 		</div>
// 	);
// }

function page() {
  return (
    <div>
        just a test page
    </div>
  )
}

export default page
