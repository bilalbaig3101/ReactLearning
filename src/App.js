import React from 'react'
import './App.css';
import CodeSnippet from './components/CodeSnippet';
import CustomButton from './components/CustomButton';
import ResponseRegion from './components/ResponseRegion';
import Textbox from './components/Textbox';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: null,
      urls: null,
      urlObj: {
        tag: null,
        region: null
      }
    }
  }
  getRegions = () => {
    fetch('https://buddi.bentley.com/WebService/GetRegions')
      .then(res => res.json())
      .then(data => JSON.stringify(data, null, 2))
      .then(string => {
        this.setState({
          regions: string
        })
      })
      .catch(error => console.log(error))
  }
  getUrls = () => {
    const {tag,region} = this.state.urlObj
    fetch(`https://buddi.bentley.com/WebService/GetURL?url=${tag}&region=${region}`)
      .then(res => res.json())
      .then(data => JSON.stringify(data, null, 2))
      .then(string => {
        this.setState({
          urls: string
        })
      })
      .catch(error => console.log(error))
  }
  onchangeHandler = ({ target }) => {
    const name = target.id;
    const value = target.value;
    this.setState(pervState => ({
      urlObj: { ...pervState.urlObj, [name]: value }
    }))
  }
  render() {
    return (
      <div className="App">
        <h1>Buddi Api</h1>
        <p>The following is a description of available REST
        endpoints for the BUDDI API. <br />
        Base URL for JSON requets:
        <CodeSnippet text="/WebService" />
        </p>
        <h2>1. GetRegions</h2>
        <ul>
          <li>Returns the list of Regions.</li>
          <li>JSON: <CodeSnippet text="GET /GetRegions" /></li>
        </ul>
        <CustomButton onClickHandler={this.getRegions} />
        <ResponseRegion data={this.state.regions} />
        <h2>2. GetURL (Dynamic)</h2>
        <ul>
          <li>Returns a URL.</li>
          <li>Paramenters must be specified in the URL as encoded parameters.</li>
          <li>JSON: <CodeSnippet text="GET /GetURL?=<url_name_or_id>&resion=<region_name_or_id>" /></li>
        </ul>
        <div>
          <h4 style={{ display: 'inline', marginRight: '10px' }}>url</h4>
          <Textbox id="tag" value={this.state.urlObj.tag}
            placeholder="URL Name or ID" handleOnChange={this.onchangeHandler} />
          <h4 style={{
            display: 'inline', marginRight: '10px',
            marginLeft: '10px'
          }}>region</h4>
          <Textbox id="region" value={this.state.urlObj.region}
            placeholder="Region Name or ID" handleOnChange={this.onchangeHandler} />
          <CustomButton onClickHandler={this.getUrls} />
          <ResponseRegion data={this.state.urls} />
        </div>
      </div>
    )
  }
}

export default App;
