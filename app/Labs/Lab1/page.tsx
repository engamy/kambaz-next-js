import Image from "next/image";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>

      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and subsections. Each section is usually prefaced with a short title or heading that attempts to summarize the topic of the section it precedes. For instance this paragraph is preceded by the heading Heading Tags. The font of the section headings are usually larger and bolder than their subsection headings. This document uses headings to introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used to format plain text so that it renders in a browser as large headings. There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest heading.
      </div>

      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1"> ... </p>
        <p id="wd-p-2">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text as shown here on
          the right.
        </p>
        <p id="wd-p-4">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
      </div>


      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>
        <h5>My favorite recipe:</h5>
        How to make spaghetti:
        <ol id="wd-spaghetti">
          <li>Boil water in a large pot.</li>
          <li>Add salt to the boiling water.</li>
          <li>Add spaghetti noodles to the pot.</li>
          <li>Cook for 8-10 minutes until al dente.</li>
          <li>Drain the pasta.</li>
          <li>Serve with your favorite sauce.</li>
        </ol>
        <h5>Unordered List Tag</h5>
        Necessary school supplies:
        <ul id="wd-school-supplies">
          <li>Laptop</li>
          <li>Water bottle</li>
          <li>Notebook</li>
          <li>Headphones</li>
          <li>Desk lamp</li>
          <li>Pencil</li>
          <li>Phone charger</li>
          <li>Coffee mug</li>
        </ul>
        My favorite books (in no particular order)
        <ul id="wd-my-books">
          <li>Chainsaw Man</li>
          <li>Dan Da Dan</li>
          <li>The Summer Hikaru Died</li>
          <li>You</li>
          <li>Death Note</li>
        </ul>
      </div>

      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>	
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>3/15/21</td>
              <td>92</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>4/8/21</td>
              <td>78</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>React</td>
              <td>5/12/21</td>
              <td>88</td>
            </tr>
            <tr>
              <td>Q5</td>
              <td>Node.js</td>
              <td>6/20/21</td>
              <td>91</td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>MongoDB</td>
              <td>7/5/21</td>
              <td>86</td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>Express</td>
              <td>8/18/21</td>
              <td>94</td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>TypeScript</td>
              <td>9/22/21</td>
              <td>89</td>
            </tr>
            <tr>
              <td>Q9</td>
              <td>Git</td>
              <td>10/15/21</td>
              <td>87</td>
            </tr>
            <tr>
              <td>Q10</td>
              <td>Deployment</td>
              <td>11/30/21</td>
              <td>93</td>
            </tr>
          </tbody>
          <tfoot>					{/* table row */}
            <tr>
              <td colSpan={3}>Average</td>	{/* column span */}
              <td>90</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div id="wd-images">
        <h4>Image Tag</h4>
        <p>Loading an image from the internet:</p>
        <Image src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" alt="Starship" />
        <p>Loading a local image:</p>
        <Image src="/images/teslabot.jpg" alt="Tesla Bot" />
      </div>

      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>
          <label htmlFor="wd-text-fields-username">Username:</label>
          <input id="wd-text-fields-username" placeholder="jdoe" /> <br />
          <label htmlFor="wd-text-fields-password">Password:</label>
          <input type="password" id="wd-text-fields-password" defaultValue="123@#$asd" />
          <br />
          <label htmlFor="wd-text-fields-first-name">First name:</label>
          <input type="text" id="wd-text-fields-first-name" title="John" /> <br />
          <label htmlFor="wd-text-fields-last-name">Last name:</label>
          <input type="text" id="wd-text-fields-last-name" placeholder="Doe"
            defaultValue="Wonderland" title="The last name" />
          {/* copy rest of form elements here  */}
          <h5>Text boxes</h5>
          <label>Biography:</label><br/>
          <textarea 
            id="wd-textarea" 
            cols={30} 
            rows={10}
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </form>
      </div>

      <div id="wd-radio-buttons">
        <h5>Radio buttons</h5>
        <label>Favorite movie genre:</label><br />

        <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
        <label htmlFor="wd-radio-comedy">Comedy</label><br />

        <input type="radio" name="radio-genre" id="wd-radio-drama"/>
        <label htmlFor="wd-radio-drama">Drama</label><br />

        <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
        <label htmlFor="wd-radio-scifi">Science Fiction</label><br />

        <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
        <label htmlFor="wd-radio-fantasy">Fantasy</label>

        <h5 id="wd-checkboxes">Checkboxes</h5>
        <label>Favorite movie genre:</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
        <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
        <label htmlFor="wd-chkbox-drama">Drama</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
        <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

        <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
        <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      </div>

      <div id="wd-dropdowns">
        <h4>Dropdowns</h4>

        <h5>Select one</h5>
        <label htmlFor="wd-select-one-genre">
          Favorite movie genre: 
        </label><br/>
        <select id="wd-select-one-genre">
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option selected value="SCIFI">
            Science Fiction
          </option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <h5>Select many</h5>
        <label htmlFor="wd-select-many-genre">
          Favorite all movie genres: 
        </label><br/>
        <select id="wd-select-many-genre" multiple>
          <option selected value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option selected value="SCIFI">
            Science Fiction
          </option>
          <option value="FANTASY">Fantasy</option>
        </select>
      </div>

      <div id="wd-otherfields">
        <h4>Other HTML field types</h4>

        <label htmlFor="wd-text-fields-salary-start">
          Starting salary:
        </label>
        <input type="number"
          id="wd-text-fields-salary-start"
          placeholder="1000"/><br/>

        <label htmlFor="wd-text-fields-rating">
          Rating: 
        </label>
        <input type="range" 
          id="wd-text-fields-rating"
          max="5"
          defaultValue="4"/><br/>

        <label htmlFor="wd-text-fields-email">
          Email: 
        </label>
        <input type="email"
          placeholder="jdoe@somewhere.com"
          id="wd-text-fields-email"/><br/>

        <label htmlFor="wd-text-fields-dob">
          Date of birth: 
        </label>
        <input type="date"
          id="wd-text-fields-dob"
          defaultValue="2000-01-21"/><br/>
      </div>


    </div>
  );
}
