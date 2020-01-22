export const basicInformationIsValid = (
  {
    name, about, cpf, cnpj,
  },
  locationId,
) => {
  let validated = true;

  if (!name) validated = false;
  if (!about) validated = false;
  if (!cpf || !cnpj) validated = false;
  if (!locationId) validated = false;

  return validated;
};

export const ignore = null;
