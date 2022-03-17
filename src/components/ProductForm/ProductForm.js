import * as React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import FormField from "../FormField";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
// import SelectInput from "../SelectInput/SelectInput";

import "./ProductForm.css";

const handleSubmit = (setFormState) => {
  return (event) => {
    const formData = new FormData(event.target);

    setFormState({ error: false, loading: true, success: false });

    const body = {
      title: formData.get(`title`) || ``,
      description: formData.get(`description`) || ``,
      imageUrl: formData.get(`imageUrl`) || ``,
      rows: [
        {
          type: `negative`,
          text: formData.get(`text`),
          source: formData.get(`source`),
        },
      ],
      "privacy-policy-accepted": formData.get(`privacy-policy-accepted`) || ``,
    };

    fetch(event.target.action, {
      method: event.target.method,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not OK`);
        }
        return response;
      })
      .then(() => {
        setFormState({ error: false, loading: false, success: true });
      })
      .catch((error) => {
        setFormState({ error: true, loading: false, success: false });
        console.error(error);
      });

    event.preventDefault();
  };
};

const ProductForm = ({ returnDestination = `/` }) => {
  const [formState, setFormState] = React.useState({
    error: false,
    loading: false,
    success: false,
  });

  const curriedHandleSubmit = React.useCallback(handleSubmit(setFormState), []);

  return (
    <div className="ProductForm">
      <div className="ProductForm__text">
        <div className="ProductForm__text-title">Siūlyk produktą</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </div>
      <div className="ProductForm__form">
        {formState.success ? (
          <div className="ProductForm__success">
            <p>Jūsų žinutė išsiųsta. Ačiū!</p>
          </div>
        ) : (
          <form
            method="POST"
            action={`https://api.suukraina.lt/v1/company?destination=${encodeURIComponent(
              returnDestination
            )}`}
            onSubmit={curriedHandleSubmit}
          >
            <FormField labelFor="title" label="Subjektas" type="text">
              <TextInput
                id="title"
                placeholder="Kompanijos Pavadinimas"
                name="title"
                required
              />
            </FormField>

            <FormField
              labelFor="description"
              label="Veiklos sritis"
              type="text"
            >
              <TextInput
                id="description"
                placeholder="Kuo subjektas užsiima? Picerija, Kavinė, Grožio salonas..."
                name="description"
                required
              />
            </FormField>

            <FormField labelFor="text" label="Apibūdinimas" type="textarea">
              <TextArea
                id="text"
                placeholder="Citata apie sąsajas iš kokio nors informacinio šaltinio"
                name="text"
                required
              />
            </FormField>

            <FormField labelFor="source" label="Šaltinis" type="text">
              <TextInput
                id="source"
                placeholder="Nuoroda į šaltinį"
                name="source"
                required
              />
            </FormField>

            <FormField labelFor="imageUrl" label="Logotipas" type="text">
              <TextInput
                id="imageUrl"
                placeholder="Nuoroda į logotipą"
                name="imageUrl"
                required
              />
            </FormField>

            {!!formState.error && (
              <p className="ProductForm__error">
                Išsiųsti nepavyko. Bandykite dar kartą arba praneškite apie
                technines problemas{` `}
                <a href="mailto:suukraina@adaptagency.com">
                  suukraina@adaptagency.com
                </a>
                .
              </p>
            )}

            <div className="ProductForm__actions">
              <Button
                color="transparent"
                disabled={formState.loading}
                type="submit"
                text="Siųsti"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  returnDestination: PropTypes.string,
};

export default ProductForm;
