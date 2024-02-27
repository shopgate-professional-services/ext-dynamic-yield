/**
 * @param {PipelineContext} context Context
 * @param {Object} input Input
 * @returns {Promise<Object>}
 */
module.exports = async (context, input) => {
  if (!input.requestActivation) {
    context.log.error('Dynamic Yield test requests could not be activated');
    return {
      success: false,
    };
  }

  await context.storage.device.set('requestActivation', input.requestActivation);

  const requestActivation = await context.storage.device.get('requestActivation');
  context.log.info(`Dynamic Yield test was set to '${requestActivation}'`);

  return {
    success: true,
  };
};
