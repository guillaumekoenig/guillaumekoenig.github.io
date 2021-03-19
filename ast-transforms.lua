function Link(el)
  -- Note: Lua has "patterns", not regexes
  -- Check https://www.lua.org/pil/20.2.html for details
  el.target = string.gsub(el.target, "^([%w-]+)%.md$", "%1.html")
  return el
end
