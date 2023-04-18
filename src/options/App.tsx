import { useState } from "react"
import "./App.css"

function App() {
  return (
    <>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <section>
          <h2>rules</h2>
          <table>
            <tbody>
              <tr>
                <td>rule name</td>
                <td>regexp</td>
                <td>
                  <ul>
                    <li>header, value</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>add rule</h2>
          <form>
            <label>
              rule name
              <input type="text" />
            </label>
            <label>
              regexp
              <input type="text" />
            </label>
            <ul>
              <li>
                <label>
                  header
                  <input type="text" />
                </label>
                <label>
                  value
                  <input type="text" />
                </label>
                <button type="button">+</button>
              </li>
            </ul>
            <button type="submit">add</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default App
