exports.getUrl = (t, userId = t.context.user.id) => t.context.endpointBaseUrl.replace(':id', userId);
