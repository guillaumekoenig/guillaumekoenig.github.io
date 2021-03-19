function Link(el)
  -- this org->html extension rewrite is inappropriate when:
  -- 1. an external link doesn't include colon (ie the protocol)
  -- 2. an org filename includes colon
  el.target = string.gsub(el.target, "^([^:]-).org", "%1.html")
  return el
end
