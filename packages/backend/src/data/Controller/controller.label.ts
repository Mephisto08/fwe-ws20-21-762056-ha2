import {getRepository} from 'typeorm';
import {Label} from '../Entities/Label';

/**
 * Erstellt ein Label.
 * Erwartet als Parameter nichts.
 * Erwartet im Body einen name.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const createLabel = async (req, res) => {
  const {name} = req.body;

  if (!name) {
    res.status(400).send({
      error: 'Error: Parameter fehlt!',
    });
    return;
  };
  const label = new Label();
  label.name = name;

  const labelRepository = getRepository(Label);
  const createdlabel = await labelRepository.save(label);

  res.status(200).send({
    data: createdlabel,
  });
};

/**
 * Löscht ein Label. Label wird mit seiner Id selektiert.
 * Erwartet als Parameter eine labelId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const deleteLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepository = getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    await labelRepository.remove(label);
    res.status(200).send({});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Gibt alle Labels zurück.
 * Erwartet als Parameter nichts.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllLabels = async (req, res) => {
  const labelRepository = getRepository(Label);
  const labels = await labelRepository.find();
  res.send({data: labels});
};

/**
 * Gibt alle Task eines Labels wieder. Label wird anhand seiner Id selektiert.
 * Erwartet als Parameter eine labelId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllTasksByLabelId = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepo = getRepository(Label);
  try {
    const label = await labelRepo.findOneOrFail(labelId);
    const labelTaskList = await label.tasks;
    res.status(200).send({data: labelTaskList});
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Gibt einen Label anhand seiner Id zurück.
 * Erwartet als Parameter eine labelId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepository = getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    res.status(200).send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};

/**
 * Updatet ein Label anhand seiner Id.
 * Erwartet als Parameter eine labelId.
 * Erwartet im Body name.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const updateLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const {name} = req.body;
  const labelRepository = getRepository(Label);

  try {
    let label = await labelRepository.findOneOrFail(labelId);
    label.name = name;

    label = await labelRepository.save(label);

    res.status(200).send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: 'Error: ' + error,
    });
  }
};
