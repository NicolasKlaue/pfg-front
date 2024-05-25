import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

// Define a type for your configuration object
interface ConfigType {
  [key: string]: string;
}

function Config() {
  const navigate = useNavigate();

  // State to manage the configuration
  const [config, setConfig] = useState<ConfigType>({});

  // Separate states for input fields
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  // Fetch the configuration from the server using Axios
  useEffect(() => {
    console.log("Fetching config data");
    const fetchData = async () => {
      try {
        const response = await axios.get("https://seashell-app-ibhqb.ondigitalocean.app/config");
        setConfig(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle changes in configuration value
  const handleValueChange = (key: string, newValue: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, [key]: newValue }));
  };

  // Function to add a new key-value pair
  const handleAddPair = () => {
    if (!keyInput || !valueInput) return;
    setConfig((prevConfig) => ({ ...prevConfig, [keyInput]: valueInput }));
    setKeyInput("");
    setValueInput("");
  };

  // Function to delete a key-value pair
  const handleDeletePair = (key: string) => {
    const { [key]: deletedKey, ...rest } = config;
    setConfig(rest);
  };

  // Function to submit the configuration
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("https://seashell-app-ibhqb.ondigitalocean.app/config", { config: config });
      console.log("Config sent successfully:", config);
      navigate("/");
    } catch (error) {
      console.error("Error sending config:", error);
    }
  };

  return (
    <div className="flex w-full justify-center h-full">
      <div className="mt-7 p-7 rounded w-2/5 flex flex-col items-center bg-slate-50 opacity-80 gap-8 border-4 border-black">
        <h1 className="text-4xl">Config</h1>
        <form onSubmit={handleSubmit}>
          {Object.entries(config).map(([key, value]) => (
            <div key={key}>
              <label>
                Key:
                <input type="text" value={key} disabled={true} />
              </label>
              <label>
                Value:
                <input
                  type="text"
                  value={value}
                  onChange={(event) =>
                    handleValueChange(key, event.target.value)
                  }
                />
              </label>
              <IconButton
                onClick={() => handleDeletePair(key)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
              <br />
            </div>
          ))}
          <label>
            New Key:
            <input
              type="text"
              value={keyInput}
              onChange={(event) => setKeyInput(event.target.value)}
            />
          </label>
          <label>
            New Value:
            <input
              type="text"
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
            />
          </label>
          <IconButton onClick={handleAddPair} aria-label="add">
            <AddIcon />
          </IconButton>
          <Button variant="contained" type="submit" onClick={handleAddPair}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Config;
