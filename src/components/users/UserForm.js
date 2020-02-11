import React from 'react'
import Select from 'react-select'
import { skills, professions, levels } from '../../../config/environment'
import ImageUpload from '../common/ImageUpload'

const UserForm = ({ data, handleChange, handleSubmit, handleMultiChange, handleChangeImage, handleChangeSkill }) => {

  const professionOptions =
    professions.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const skillsOptions =
    skills.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const levelOptions =
    levels.map(item => {
      return (
        { value: item, label: item }
      )
    })
  return (
    <div>
      {/* {console.log(data)} */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <div>
            <input
              className="input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
        </div>
        {/* <div>
          <label>Profile Image URL</label>
          <div>
            <input
              className="input"
              placeholder="Profile Image URL"
              name="profileImage"
              onChange={handleChange}
              value={data.profileImage}
            />
          </div>
        </div> */}
        <div>
          <label>Upload Profile Image</label>
          <ImageUpload
            labelText="Upload your profile image"
            onChange={handleChange}
            required
            name="profileImage"
            handleChangeImage={handleChangeImage}
            fieldName="profileImage"
          />
        </div>
        <div>
          <label>Location</label>
          <div>
            <input
              className="input"
              placeholder="Location"
              name="location"
              onChange={handleChange}
              value={data.location}
            />
          </div>
        </div>
        <div></div>
        <div>
          <label>Bio</label>
          <div>
            <input
              className="input"
              placeholder="Bio"
              name="bio"
              onChange={handleChange}
              value={data.bio}
            />
          </div>
        </div>
        <div>
          <label>Profession/Industry</label>
          <div>
            <Select
              options={professionOptions}
              isMulti
              name="professions"
              value={professionOptions.filter(profession => data.professions.includes(profession.value))}
              onChange={handleMultiChange}
            />
          </div>
        </div>
        <div>
          <label>Level</label>
          <div>
            <Select
              options={levelOptions}
              isMulti
              name="level"
              // value={levelOptions.filter(l => data.level.includes(l.value))}
              onChange={handleMultiChange}
            />
          </div>
        </div>
        <div>
          <label>Skills</label>
          <div>
            <Select
              options={skillsOptions}
              isMulti
              name="skills"
              // value={skillsOptions.filter(skill => data.skills['skill'].includes(skill.value))}
              onChange={handleChangeSkill}
            />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
export default UserForm