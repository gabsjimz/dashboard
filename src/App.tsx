import { useState } from "react";
import Grid from "@mui/material/Grid2";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import IndicatorWeather from "./components/IndicatorWeather";
import ControlWeather from "./components/ControlWeather";
import TableWeather from "./components/TableWeather";
import LineChartWeather from "./components/LineChartWeather";
import { useEffect } from "react";
import Item from "./interface/Item.tsx";

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  /* Hook: useEffect */
  useEffect(() => {
    const request = async () => {
      /* Request */
      const API_KEY = "OPENWEATHERMAP' API KEY";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
      );
      const savedTextXML = await response.text();

      /* XML Parser */
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      /* Arreglo para agregar los resultados */
      const dataToIndicators: Indicator[] = new Array<Indicator>();
      const dataToItems: Item[] = new Array<Item>();

      /* Análisis, extracción y almacenamiento del contenido del XML en el arreglo de resultados */
      const name = xml.getElementsByTagName("name")[0].innerHTML || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "City",
        value: name,
      });

      const location = xml.getElementsByTagName("location")[1];

      const latitude = location.getAttribute("latitude") || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "Latitude",
        value: latitude,
      });

      const longitude = location.getAttribute("longitude") || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "Longitude",
        value: longitude,
      });

      const altitude = location.getAttribute("altitude") || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "Altitude",
        value: altitude,
      });

      const time = xml.getElementsByTagName("time")[0] || "";
      const from = time.getAttribute("from");
      const to = time.getAttribute("to");

      const timeChildren = time.children();
      timeChildren[1].getAttribute("probability");
      timeChildren[8].getAttribute("value");

      console.log(dataToIndicators);
      setIndicators(dataToIndicators);
    };

    request();
  }, []);

  return (
    <Grid container spacing={5}>
      {/* Indicadores */}
      <Grid size={{ xs: 12, sm: 3 }}>
        <IndicatorWeather
          title={"Indicator 1"}
          subtitle={"Unidad 1"}
          value={"1.23"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <IndicatorWeather
          title={"Indicator 2"}
          subtitle={"Unidad 2"}
          value={"3.12"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <IndicatorWeather
          title={"Indicator 3"}
          subtitle={"Unidad 3"}
          value={"2.31"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <IndicatorWeather
          title={"Indicator 4"}
          subtitle={"Unidad 4"}
          value={"3.21"}
        />
      </Grid>

      {/* Tabla */}

      <Grid size={{ xs: 12, sm: 8 }}>
        <ControlWeather />
      </Grid>
      <Grid size={{ xs: 12, sm: 9 }}>
        <TableWeather />
      </Grid>

      {/* Gráfico */}

      <Grid size={{ xs: 12, xl: 4 }}>
        <LineChartWeather />
      </Grid>
      {indicators.map((indicator, idx) => (
        <Grid key={idx} size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather
            title={indicator["title"]}
            subtitle={indicator["subtitle"]}
            value={indicator["value"]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
