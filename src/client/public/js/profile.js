var ProfileInfo = new Vue({
  el: '#profile_info',
  data: {
    userInfo: {
      username: '',
      fullname: '',
      userImage: '',
      gender: '',
      country: ''
    },
    loading: true
  },
  created: function() {
    axios.get(`${API_URL}/profile/info`).then(res => {
      console.log(res.data);
    });
  },
  template: ` <div>
    <header class="card-header">
        <p class="card-header-title">
          Edit Your Profile
        </p>
      </header>
      <div class="card-content">
        <div class="content" v-if="loading">
          Loading...
        </div>
        <div v-else class="content">
          <!-- username -->
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-medium" type="text" placeholder="Text input" :value="userInfo.username %>">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <!-- <p class="help">This username isn't available</p> -->
          </div>
          <!-- fullname -->
          <div class="field">
            <label class="label">Fullname</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-medium" type="text" placeholder="Text input" value="userInfo.fullname %>">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
          </div>
          <!-- profile picture -->
          <div class="field">
            <label class="label">Change Profile Picture</label>
            <div class="field">
              <div class="file is-medium has-name">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Select Photo
                    </span>
                  </span>
                  <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                  </span>
                </label>
              </div>
            </div>
          </div>
          <!-- country -->
          <div class="field">
            <label class="label">Country</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-medium" type="text" placeholder="Text input" value="userInfo.country %>">
              <span class="icon is-small is-left">
                <i class="fas fa-globe"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <!-- <p class="help">This username is available</p> -->
          </div>
          <!-- gender -->
          <div class="field">
            <label class="label">Select Gender</label>
            <p class="control has-icons-left">
              <span class="select is-medium">
              <%if (!userInfo.gender) { %>
                <select>
                  <option selected disabled value="">Select One</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              <% } %>
              <%if (userInfo.gender === 'Male') { %>
                <select>
                  <option disabled value="">Select One</option>
                  <option selected>Male</option>
                  <option>Female</option>
                </select>
              <% } %>
              <%if (userInfo.gender === 'Female') { %>
                <select>
                  <option selected disabled value="">Select One</option>
                  <option>Male</option>
                  <option selected>Female</option>
                </select>
              <% } %>
              </span>
              <span class="icon is-small is-left">
                <i class="fa fa-transgender"></i>
              </span>
            </p>
          </div>
          <!-- submit button -->
          <div style="margin-top: 1.8rem;" class="field is-grouped">
            <div class="control">
              <button class="button is-outlined is-medium is-link">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
                <span>Update Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end Profile card -->
  </div>
  <div class="column">
    <!-- Profile card -->
    <div class="card profile-container">
      <header class="card-header">
        <p class="card-header-title">
          Change Password
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-medium" type="password" placeholder="Current Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-medium" type="password" placeholder="New Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-medium" type="password" placeholder="Retype Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <!-- submit button -->
          <div style="margin-top: 1.8rem;" class="field is-grouped">
            <div class="control">
              <button class="button is-outlined is-medium is-link">
                <span class="icon is-small">
                  <i class="fas fa-lock"></i>
                </span>
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  `
});
