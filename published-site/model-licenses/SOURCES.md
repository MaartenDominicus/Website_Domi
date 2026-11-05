# Tool model sources

Author: **LonesomeDucky**. Licence: **CC0-1.0**. Checked on the original author uploads, 4 November 2026. Commercial use and modification permitted; no attribution obligation. Credit retained here. Full legal text: CC0-1.0.txt.

- Tool Pack 1: https://opengameart.org/content/tool-pack-1
- Tool Pack 2: https://opengameart.org/content/tool-pack-2

Retained geometry (OBJ extracted from the author’s GLBs, node transforms applied, textures omitted):

- adjustable_wrench.obj: Tool Pack 1, adjustable_wrench.glb; sliding Claw and WormGear remain separate.
- tape_measure.obj: Tool Pack 1, tape_measure.glb.
- pliers.obj: Tool Pack 2, pliers.glb; original Left/Right bone groups retained for jaw movement.
- mallet.obj: Tool Pack 2, mallet.glb.
- utility_knife.obj: Tool Pack 2, utility_knife.glb; original Switch group retained.

Reproduce geometry extraction: `python3 scripts/import-tool-models.py /path/to/extracted/glbs`. Reproduce normalized, area-weighted deterministic point samples: `python3 scripts/sample-tool-models.py`. Only the generated points enter the browser; no source downloads or textures at runtime. The adjustable jaw, tool pivot, stationary pipe and turning hexagonal coupling are animated separately. The pipe and coupling are simple original workpiece geometry.

Original archive downloads and SHA-256 (archives not required at runtime):

- https://opengameart.org/sites/default/files/tool_pack_1.zip
  83963dd353bea93c3ca0fa4f61123ba6d9ef72a85872a61260ee4657250a53b4

- https://opengameart.org/sites/default/files/tool_pack_2.zip
  56a68f7bf0d55b59afa91b648c8f37914ca7d93015c8c0223c233f0b8fdda764

Work scenes use the same authored tool surfaces. Timber, dowels, plasterboard, guide, extended measuring tape, and wire are original simple workpiece geometry. The wire keeps its material length while bending; completed workpieces hold their result during the unloaded tool return.

## Outdoor tap — Scopia / Space Mushrooms

Garden faucet, obtained 4 November 2026 from the official Sweet Home 3D library (Models by Scopia): https://www.sweethome3d.com/freeModels.jsp
Original ZIP: https://www.sweethome3d.com/wp-content/themes/sweet-home-3d/theme/assets/models/scopia/garden-faucet.zip
Licence: **CC BY 3.0**, commercial use and adaptations allowed. Attribution required to **Space Mushrooms** and **Scopia Visual Interfaces Systems, s.l.** (http://www.scopia.es). Original included terms retained in GARDEN-FAUCET-LICENSE.txt. Licence: https://creativecommons.org/licenses/by/3.0/

Original OBJ and MTL retained unchanged. Derivative: triangulated, reoriented, normalized and deterministically sampled offline; handle and stem identified by source height for animation. Supply pipe and emitted water are original workpiece geometry. Attribution also appears beside the scene in the website. ZIP SHA-256: 8ffa76510d9d85ad5784752e081e38e5fe0da07ce5cb3e7e688906bde678fdef
