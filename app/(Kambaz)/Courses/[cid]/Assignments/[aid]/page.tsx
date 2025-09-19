export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" defaultValue="ASSIGNMENT NAME" /><br /><br />
        <textarea 
          id="wd-description"
          defaultValue="The assignment is available online Submit a link to the landing page of"
        />
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} type="number" />
            </td>
          </tr>
        </table>

        <label htmlFor="wd-assignment-group">
          Assignment Group<br></br>
        </label>
        <select id="wd-assignment-group">
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
        </select>

        <br></br>

        <label htmlFor="wd-grade-display">
          Display grade as 
        </label>
        <select id="wd-select-grade-display">
          <option selected value="Percentage">Percentage</option>
          <option value="Letter">Letter</option>
        </select>

        <br></br>

        <input type="checkbox" name="check-finalgrade" id="wd-chkbox-finalgrade"/>
        <label htmlFor="wd-chkbox-finalgrade">Do not count this assignment towards final grade</label><br/>

        <br></br>

        <label htmlFor="wd-submission-type">
          Submission Type<br></br>
        </label>
        <select id="wd-submission-type">
          <option value="Online">Online</option>
          <option value="In-Person">In-Person</option>
        </select>
        
        <h4>Online Entry Options</h4>
        <input type="checkbox" id="wd-text-entry" name="online-options" />
        <label htmlFor="wd-text-entry">Text Entry</label><br/>
        
        <input type="checkbox" id="wd-website-url" name="online-options" />
        <label htmlFor="wd-website-url">Website URL</label><br/>
        
        <input type="checkbox" id="wd-media-recordings" name="online-options" />
        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
        
        <input type="checkbox" id="wd-student-annotation" name="online-options" />
        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
        
        <input type="checkbox" id="wd-file-uploads" name="online-options" />
        <label htmlFor="wd-file-uploads">File Uploads</label><br/>

        <label htmlFor="wd-group-assignment">
          Group Assignment?
        </label>
        <select id="wd-select-yes-no">
          <option value="Yes">Yes</option>
          <option selected value="No">No</option>
        </select>

        <br></br>

        <label htmlFor="wd-assign-to">
          Assign To<br></br>
        </label>
        <select id="wd-assign-to" multiple>
          <option selected value="Everyone">Everyone</option>
          <option value="Alice Wonderland">Alice Wonderland</option>
          <option value="Ada Lovelace">Ada Lovelace</option>
          <option value="Albert Einstein">Albert Einstein</option>
        </select>

        <br></br>

        <label htmlFor="wd-due-date">
          Due Date
        </label>
        <input defaultValue="2025-01-01" type="date" id="wd-due-date" />
        
        <label htmlFor="wd-due-time">
          Time
        </label>
        <input defaultValue="12:00" type="time" id="wd-due-time" />

        <br></br>

        <label htmlFor="wd-available-from-date">
          Available From
        </label>
        <input defaultValue="2025-01-01" type="date" id="wd-available-from-date" />
        
        <label htmlFor="wd-available-from-time">
          Time
        </label>
        <input defaultValue="12:00" type="time" id="wd-available-from-time" />

        <br></br>

        <label htmlFor="wd-until-date">
          Until
        </label>
        <input defaultValue="2025-01-01" type="date" id="wd-until-date" />
        
        <label htmlFor="wd-until-time">
          Time
        </label>
        <input defaultValue="12:00" type="time" id="wd-until-time" />

        <br></br>

        
        



      </div>
  );}
  