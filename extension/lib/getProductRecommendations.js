const DynamicYieldClient = require('./dynamicYield/Client');

/**
 * @param {PipelineContext} context Context
 * @param {Object} input Input
 * @returns {Promise<Object>}
 */
module.exports = async (context, input) => (
  new DynamicYieldClient(context).getChosenVariations(input)
);
