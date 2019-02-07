export default {
  validity: obj => obj,

  memorableDates(obj) {
    let anniversaries = [];

    if (obj.since) {
      anniversaries.push({
        date: obj.since,
        type: "ANNIVERSARY",
        description: "Start working as the role..."
      });
    }

    if (obj.until) {
      anniversaries.push({
        date: obj.until,
        type: "ANNIVERSARY",
        description: "Left for the role..."
      });
    }

    return anniversaries;
  },
};