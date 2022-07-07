function classNames(...classes) {
  if (classes.length === 1) {
    return classes[0].join(" ");
  }
  return classes.filter(Boolean).join(" ");
}

export { classNames };
