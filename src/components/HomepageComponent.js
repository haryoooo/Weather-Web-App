import React from "react";
import { Table } from "react-bootstrap";
import "./HomepageComponent.css";

export default function HomepageComponent(props) {
  return (
    <div className="Homepage">
      <div className="HeaderCountry">
        <span className="state">{props.state}</span>{" "}
        <small className="country">{props.country}</small>
      </div>
      <span className="Temperature">
        <span className="temp">{Math.round(props.temp)}</span>
        <span className="degree">&#8451;</span>
      </span>
      <div className="weatherIcon">
        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />
      </div>
      <h4
        style={{ fontWeight: 200, textTransform: "capitalize", marginTop: 100 }}
      >
        {props.description}
      </h4>
      <div className="minMaxTemperature">
        <span style={{ marginRight: 30 }}>
          H : {Math.round(props.minTemp)}
          <span className="degree">&#8451;</span>
        </span>
        <span>
          L : {Math.round(props.maxTemp)}
          <span className="degree">&#8451;</span>
        </span>
      </div>
      <span className="minMaxTemperature">
        <Table striped bordered hover>
          <thead>
            <tr className="tableHeader">
              <th>Visibility</th>
              <th>Humidity</th>
              <th>Feels Like</th>
              <th>Pressure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tableValue">{props.visibility / 1000} Km</td>
              <td className="tableValue">{props.humidity}&#37;</td>
              <td className="tableValue">
                {Math.round(props.feels_like)}
                <span className="degree">&#8451;</span>
              </td>
              <td className="tableValue">{props.pressure} hPa</td>
            </tr>
          </tbody>
        </Table>
      </span>
    </div>
  );
}
