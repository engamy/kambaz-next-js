export default function Modules() {
    return (
      <div>

        <div className="wd-buttons">
            <button>Collapse All</button> 
            <button>View Progress</button>
        <select id="wd-select-one-genre">
          <option value="W1">Week 1</option>
          <option value="W2">Week 2</option>
          <option value="W3">Week 3</option>
          <option selected value="W1">
            Publish All
          </option>
        </select>
        <button>+ Module</button>
        </div>


        {/* Implement Collapse All button, View Progress button, etc. */}
        <ul>
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                    <li><a href="https://docs.google.com/document/d/1wpgYSP3t8avVhxYmN42cmbbpu3I38c4mDqDytllbJIk/edit?tab=t.0#heading=h.nbfs8x9iykbg" target="_blank">
                    Developing Full Stack MERN Web Applications - Chapter 1 - Building React User Interfaces with HTML Links to an external site.
                    </a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">ASSIGNMENT 1 - PROTOTYPING THE KAMBAZ REACT APP WITH HTML</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Implementing the Kambaz Account Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Dashboard Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Courses Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Modules Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Assignments Screens</li>
                  <li className="wd-content-item">Kambas Web App on Netlify</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 3</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">ASSIGNMENT 3 - STYLING PAGES WITH CSS AND BOOTSTRAP</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to CSS</li>
                  <li className="wd-content-item">Selectors by tag ID, classes, and document structure</li>
                  <li className="wd-content-item">Styling color and background color</li>
                  <li className="wd-content-item">Styling dimensions and positions</li>
                  <li className="wd-content-item">The box model - styling margins, borders, and paddings</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
  