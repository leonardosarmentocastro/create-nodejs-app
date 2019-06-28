// Replaces the path variable ":id" with an actual user id.
exports.getUrl = (t, userId = t.context.user.id) => t.context.endpointBaseUrl.replace(':id', userId);
