import { useEffect, useState } from "react"
import "./App.css"

const App = () => {
  return (
    <div className="App" style={{ width: "600px" }}>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>pattern</th>
              <th>on/off</th>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default App
