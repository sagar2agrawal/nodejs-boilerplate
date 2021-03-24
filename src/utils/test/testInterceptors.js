export const mockRequest = (params, body) => {
  const req = {};
  req.param = jest.fn().mockReturnValue(req);
  req.body = jest.fn().mockReturnValue(req);
  return req;
};

export const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => {
  const next = {};
  return jest.fn().mockReturnValue(next);
};
