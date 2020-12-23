import React from 'react'
import './components/styles/App.css';
import CodeSnippet from './components/CodeSnippet';
import CustomButton from './components/CustomButton';
import ResponseRegion from './components/ResponseRegion';
import Textbox from './components/Textbox';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dark:false,
      regions: null,
      urls: null,
      legacyUrls: null,
      urlObj: {
        tag: "",
        region: ""
      },
      legacyUrlObj:{
        tag:"",
        region:""
      }
    }
  }
  componentDidMount() {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(isDarkTheme){
      this.setState({dark:true})
      // import('./components/styles/style-dark.css')
    }
  }
  toogleTheme =() =>{
    const theme= !(this.state.dark);
    this.setState({
      dark: theme
    })
    if(theme){
      import('./components/styles/style-dark.css')
    }
    else{
      import('./components/styles/style-light.css')
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
    const { tag, region } = this.state.urlObj
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
  getLegacyUrls = () => {
    const { tag, region } = this.state.legacyUrlObj
    fetch(`https://buddi.bentley.com/WebService/GetURL?urlName=${tag}&regionId=${region}`)
      .then(res => res.json())
      .then(data => JSON.stringify(data, null, 2))
      .then(string => {
        this.setState({
          legacyUrls: string
        })
      })
      .catch(error => console.log(error))
  }
  onchangeHandlerURL = ({ target }) => {
    const name = target.id;
    const value = target.value;
    this.setState(pervState => ({
      urlObj: { ...pervState.urlObj, [name]: value }
    }))
  }
  onchangeHandlerLegacy = ({ target }) => {
    const name = target.id;
    const value = target.value;
    this.setState(pervState => ({
      legacyUrlObj: { ...pervState.legacyUrlObj, [name]: value }
    }));
  }
  render() {
    return (
      <div className="App">
        <CustomButton onClickHandler={this.toogleTheme} text={`Switch to ${this.state.dark?("🌝"):("🌚")}`}/>
        <h1>Buddi Api {this.state.dark?("🌚"):("🌝")}</h1>
        <p>The following is a description of available REST
        endpoints for the BUDDI API. <br />
        Base URL for JSON requets: <CodeSnippet text="/WebService" />
        </p>
        <h2>1. GetRegions</h2>
        <ul>
          <li>Returns the list of Regions.</li>
          <li>JSON: <CodeSnippet text="GET /GetRegions" /></li>
        </ul>
        <CustomButton text="Test GET" onClickHandler={this.getRegions} />
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
            placeholder="URL Name or ID" handleOnChange={this.onchangeHandlerURL} />
          <h4 style={{
            display: 'inline', marginRight: '10px',
            marginLeft: '10px'
          }}>region</h4>
          <Textbox id="region" value={this.state.urlObj.region}
            placeholder="Region Name or ID" handleOnChange={this.onchangeHandlerURL} />
          <CustomButton text="Test GET" onClickHandler={this.getUrls} />
          <ResponseRegion data={this.state.urls} />
        </div>
        <h2>3. GetURL (Legacy)</h2>
        <ul>
          <li>Returns a URL.</li>
          <li>Paramenters must be specified in the URL as encoded parameters.</li>
          <li>JSON: <CodeSnippet text="GET /GetURL?urlName=<url_name>&regionId=<regionId>" /></li>
        </ul>
        <div>
          <h4 style={{ display: 'inline', marginRight: '10px' }}>urlName</h4>
          <Textbox id="tag" value={this.state.legacyUrlObj.tag}
            placeholder="URL Name" handleOnChange={this.onchangeHandlerLegacy} />
          <h4 style={{
            display: 'inline', marginRight: '10px',
            marginLeft: '10px'
          }}>regionId</h4>
          <Textbox id="region" value={this.state.legacyUrlObj.region}
            placeholder="Region ID" handleOnChange={this.onchangeHandlerLegacy} />
          <CustomButton text="Test GET" onClickHandler={this.getLegacyUrls} />
          <ResponseRegion data={this.state.legacyUrls} />
        </div>
      </div>
    )
  }
}

export default App;
